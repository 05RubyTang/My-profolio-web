// 临时脚本：拉取指定 Figma 节点并输出扁平化规格 dump
// 使用完可删。执行：node scripts/dump-figma-nodes.mjs A:B,C:D /tmp/out.txt
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envRaw = fs.readFileSync(envPath, "utf8");
  for (const line of envRaw.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = "mSChl72e9N1qUgRzHPQWuk";
if (!FIGMA_TOKEN) { console.error("Missing FIGMA_TOKEN"); process.exit(1); }

const argIds = (process.argv[2] || "").split(",").map(s => s.trim()).filter(Boolean);
if (argIds.length === 0) { console.error("usage: node dump-figma-nodes.mjs A:B,C:D,..."); process.exit(1); }

const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${argIds.join(",")}`;
const resp = await fetch(url, { headers: { "X-Figma-Token": FIGMA_TOKEN } });
if (!resp.ok) { console.error("HTTP", resp.status, await resp.text()); process.exit(1); }
const data = await resp.json();

const out = [];
const fmt = n => typeof n === "number" ? Math.round(n * 100) / 100 : n;
function paintStr(p) {
  if (!p) return "";
  if (p.type === "SOLID") {
    const c = p.color;
    const a = p.opacity ?? c.a ?? 1;
    return `rgba(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)},${fmt(a)})`;
  }
  if (p.type?.startsWith("GRADIENT_")) {
    const stops = (p.gradientStops || []).map(s => `${paintStr({type:"SOLID",color:s.color})} ${Math.round(s.position*100)}%`).join(", ");
    return `${p.type}(${stops})`;
  }
  if (p.type === "IMAGE") return `IMG:${p.imageRef}`;
  return p.type;
}
const paintsStr = paints => (paints||[]).map(paintStr).filter(Boolean).join(" | ");
function strokesStr(node){ if(!node.strokes?.length) return ""; const w=node.strokeWeight?` w=${fmt(node.strokeWeight)}`:""; return " stroke "+node.strokes.map(paintStr).join(",")+w; }
function fxStr(node){ if(!node.effects) return ""; return node.effects.filter(e=>e.visible!==false).map(e=>{
  if(e.type==="DROP_SHADOW"||e.type==="INNER_SHADOW"){ const label=e.type==="INNER_SHADOW"?"inner-shadow":"shadow"; const col=e.color?`rgba(${Math.round(e.color.r*255)},${Math.round(e.color.g*255)},${Math.round(e.color.b*255)},${fmt(e.color.a)})`:""; return ` fx=${label} ${fmt(e.offset?.x||0)},${fmt(e.offset?.y||0)} r=${fmt(e.radius||0)} ${col}`; }
  if(e.type==="LAYER_BLUR"||e.type==="BACKGROUND_BLUR") return ` fx=blur ${fmt(e.radius||0)}`;
  return "";
}).join(""); }
function radiusStr(node){ if(node.cornerRadius!=null) return ` r=${fmt(node.cornerRadius)}`; if(node.rectangleCornerRadii) return ` r=${node.rectangleCornerRadii.map(fmt).join(",")}`; return ""; }
function textStr(node){ if(node.type!=="TEXT") return ""; const s=node.style||{}; const chars=(node.characters||"").replace(/\n/g,"\\n"); return ` TEXT="${chars}" style=${JSON.stringify({sz:s.fontSize,w:s.fontWeight,fam:s.fontFamily,italic:s.italic,ls:s.letterSpacing,lh:s.lineHeightPx})}`; }
function walk(node, depth=0){
  const indent = "  ".repeat(depth);
  const bb = node.absoluteBoundingBox;
  const wh = bb ? `${fmt(bb.width)}x${fmt(bb.height)} @(${fmt(bb.x)},${fmt(bb.y)})` : "";
  const fills = paintsStr(node.fills);
  out.push(`${indent}[${node.type}] ${node.name||""} ${wh}${radiusStr(node)}${fills?" "+fills:""}${strokesStr(node)}${fxStr(node)}${textStr(node)}`);
  if(Array.isArray(node.children)) for(const c of node.children) walk(c, depth+1);
}
for (const id of argIds) {
  const nodeInfo = data.nodes[id] || data.nodes[id.replace(":","-")];
  if (!nodeInfo) { out.push(`\n========== NODE ${id} NOT FOUND ==========`); continue; }
  out.push(`\n========== NODE ${id} ==========`);
  walk(nodeInfo.document);
}
fs.writeFileSync(process.argv[3]||"/tmp/figma-nodes-dump.txt", out.join("\n"));
console.log("Wrote", out.length, "lines to", process.argv[3]||"/tmp/figma-nodes-dump.txt");
