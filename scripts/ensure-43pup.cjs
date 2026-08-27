/**
 * 43pup (inchowon58-beep/43pup) 전용 배포 가드
 * 230cat / maincoonmar / marketstore 지역 사이트와 섞지 않습니다.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ALLOWED_REMOTE = /github\.com[:/]+inchowon58-beep\/43pup(\.git)?$/i;
const BLOCKED_REMOTE =
  /230cat|maincoonmar|mainyou|pupmaincoon|enmaincoon|marketstore|강아지장례/i;

function fail(msg) {
  console.error("이 프로젝트는 43pup(포옹데이) 전용입니다. 230cat 에는 푸시하지 않습니다.");
  console.error(msg);
  process.exit(1);
}

function readVercelProject() {
  const p = path.join(process.cwd(), ".vercel", "project.json");
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

const vercel = readVercelProject();
if (vercel?.projectName && /^(230cat|maincoonmar|wild-coon|pupmaincoon)$/i.test(vercel.projectName)) {
  fail(
    `Vercel 연결이 기존 '${vercel.projectName}' 입니다.\n` +
      `43pup 전용 새 Vercel 프로젝트로 다시 연결하세요.`
  );
}

let remote = "";
try {
  remote = execSync("git remote get-url origin", { encoding: "utf8" }).trim();
} catch {
  fail("git origin이 없습니다. https://github.com/inchowon58-beep/43pup.git 로 설정하세요.");
}

if (BLOCKED_REMOTE.test(remote) && !ALLOWED_REMOTE.test(remote)) {
  fail(`git origin이 이전 저장소입니다:\n  ${remote}`);
}
if (!ALLOWED_REMOTE.test(remote)) {
  fail(
    `git origin은 https://github.com/inchowon58-beep/43pup.git 이어야 합니다.\n  현재: ${remote}`
  );
}

console.log("✅ 배포 대상 확인: 43pup (inchowon58-beep/43pup)");
