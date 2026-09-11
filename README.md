# ⚡ 바로서치 (BaroSearch) - 1초 만에 완성하는 통합 멀티 검색

**바로서치(BaroSearch)**는 단 한 번의 검색어 입력만으로 쿠팡, 네이버, 유튜브, 구글, 학술지, 커뮤니티 등 사용자가 미리 설정해둔 다양한 사이트로 1초 만에 연결해 주는 스마트 멀티 서치 포털입니다.

---

## 🔥 핵심 주요 기능

1. **통합 키워드 멀티 서치**: 메인 검색창에 키워드(예: `단백질`, `아이폰16`, `VLOOKUP`)를 입력하고 카드의 버튼을 클릭하면 1초 만에 결과 페이지로 직행.
2. **카테고리 탭 지원**: 🛍️ 쇼핑, 🔍 포털/영상, 💻 개발/지식, 📚 학술/정보, 📈 금융/경제, 🎮 커뮤니티, 🤖 AI 툴 7대 주제별 구성.
3. **1클릭 추천 팩 (Preset Packs)**: 쇼핑 마스터 팩, 개발자 팩, 대학원생 논문 팩, 커뮤니티 팩 클릭 한 번에 추가.
4. **나만의 사이트 커스텀 (Add/Edit/Delete)**: 사용자가 자주 가는 사이트를 자유롭게 추가, 수정, 삭제 가능 (Google 파콘 자동 추출 지원).
5. **무료 호스팅 100% 호환 (서버 비용 0원)**: 백엔드 DB 없이 `LocalStorage` 기반으로 작동하여 GitHub Pages나 Vercel에 0원으로 평생 배포 가능.
6. **다크 모드 / 라이트 모드**: 사용자의 눈 건강을 위한 테마 스위처 내장.
7. **데이터 백업 / 복원**: 내 설정을 `.json` 파일로 안전하게 백업 및 복원.

---

## 🚀 GitHub Pages 무료 배포 방법

1. **GitHub 저장소(Repository) 생성**:
   * GitHub에서 `barosearch` 이름의 새 레포지토리를 만듭니다.
2. **코드 푸시 (Push)**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for BaroSearch"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/barosearch.git
   git push -u origin main
   ```
3. **GitHub Pages 활성화**:
   * 저장소의 `Settings` -> `Pages` 이동.
   * `Branch`를 `main`으로 설정 후 `Save`.
   * **1분 뒤 `https://YOUR_USERNAME.github.io/barosearch` 주소로 100% 무료 서비스 시작!**

---

## ⚡ Vercel 무료 배포 방법

1. [Vercel.com](https://vercel.com) 회원가입 (GitHub 계정 연동).
2. `Add New Project` 클릭 후 `barosearch` 저장소 선택.
3. `Deploy` 버튼 클릭 ➔ **5초 만에 무료 배포 완료!**
