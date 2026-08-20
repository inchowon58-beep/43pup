/**
 * 메종드두들 (inchowon58-beep/doodle / doodle.puppytimes.co.kr) 전용 배포 가드
 * 기존 catterydoodle·muzi02·muzi01·muziga·eanimal·funeral 저장소와 섞이지 않도록 합니다.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ALLOWED_REMOTE = /github\.com[:/]+inchowon58-beep\/doodle(\.git)?$/i;
const BLOCKED_REMOTE =
  /catterydoodle|muzi02|muzi01|muziga|eanimal|inchowon58-beep\/funeral(\.git)?$|cloudshelter|jejumilgam|dogboho|구름이네|puppyshop|agapet/i;

function fail(msg) {
  console.error("이 프로젝트는 doodle (메종드두들 / doodle.puppytimes.co.kr) 전용입니다.");
  console.error("기존 catterydoodle / muzi02 / muzi01 / muziga / eanimal / funeral.git 에는 절대 push/deploy 하지 마세요.\n");
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
if (vercel?.projectName && /eanimal|muziga|muzi01|muzi02|catterydoodle/i.test(vercel.projectName)) {
  fail(
    `Vercel 연결이 기존 '${vercel.projectName}' 입니다. 이전 프로젝트는 사용하지 않습니다.\n` +
      `doodle.puppytimes.co.kr / inchowon58-beep/doodle 전용으로 다시 연결하세요.`
  );
}

let remote = "";
try {
  remote = execSync("git remote get-url origin", { encoding: "utf8" }).trim();
} catch {
  fail("git origin이 없습니다. https://github.com/inchowon58-beep/doodle.git 로 설정하세요.");
}

if (BLOCKED_REMOTE.test(remote)) {
  fail(`git origin이 이전 저장소입니다 (기존 저장소 사용 금지):\n  ${remote}`);
}
if (!ALLOWED_REMOTE.test(remote)) {
  fail(
    `git origin은 https://github.com/inchowon58-beep/doodle.git 이어야 합니다.\n  현재: ${remote}`
  );
}

console.log("✅ 배포 대상 확인: 메종드두들 (doodle / doodle.puppytimes.co.kr)");
