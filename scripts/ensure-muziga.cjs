/**
 * 안심강아지장례식장 (muziga / funeral.puppytimes.co.kr) 전용 배포 가드
 * 기존 eanimal·funeral 저장소와 섞이지 않도록 합니다.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const vercelPath = path.join(root, ".vercel", "project.json");
const ALLOWED_REMOTE = /github\.com[:/]+inchowon58-beep\/muziga(\.git)?$/i;
const BLOCKED_REMOTE =
  /eanimal|inchowon58-beep\/funeral(\.git)?$|cloudshelter|jejumilgam|dogboho|구름이네|puppyshop/i;

function fail(msg) {
  console.error("\n❌ 배포 중단 — " + msg);
  console.error("이 프로젝트는 muziga (안심강아지장례식장 / funeral.puppytimes.co.kr) 전용입니다.");
  console.error("기존 강아지장례식장(eanimal / funeral.git)에는 절대 push/deploy 하지 마세요.\n");
  process.exit(1);
}

if (fs.existsSync(vercelPath)) {
  const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
  if (vercel.projectName && /eanimal/i.test(vercel.projectName)) {
    fail(
      `Vercel 연결이 기존 '${vercel.projectName}' 입니다. eanimal 프로젝트는 사용하지 않습니다.\n` +
        `해결: npx vercel link 로 새 프로젝트에 연결하세요.`
    );
  }
}

let remote = "";
try {
  remote = execSync("git remote get-url origin", { cwd: root, encoding: "utf8" }).trim();
} catch {
  /* origin 없음 — 로컬 제작 단계 */
}

if (remote) {
  if (BLOCKED_REMOTE.test(remote) && !ALLOWED_REMOTE.test(remote)) {
    fail(`git origin이 muziga가 아닙니다 (기존 저장소 사용 금지):\n  ${remote}`);
  }
  if (!ALLOWED_REMOTE.test(remote)) {
    fail(
      `git origin은 https://github.com/inchowon58-beep/muziga.git 이어야 합니다.\n  현재: ${remote}`
    );
  }
}

console.log("✅ 배포 대상 확인: 안심강아지장례식장 (muziga / funeral.puppytimes.co.kr)");
