import asyncio
from playwright.async_api import async_playwright

async def open_my_case():
    async with async_playwright() as p:
        # 브라우저 실행 (사용자가 조작해야 하므로 headless=False)
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        print("법원 사이트로 이동합니다...")
        await page.goto("https://www.scourt.go.kr/portal/information/events/search/search.jsp")

        # 1. 정보 자동 입력 (본인 정보로 수정하세요)
        await page.select_option("select#mf_ssgoTopMainTab_contents_content1_body_sbx_cortCd", label="서울남부지방법원") # 법원명
        await page.select_option("select#mf_ssgoTopMainTab_contents_content1_body_sbx_csYr", label="2022")            # 연도
        await page.select_option("select#mf_ssgoTopMainTab_contents_content1_body_sbx_csDvsCd", label="가소")          # 사건구분
        await page.fill("input#mf_ssgoTopMainTab_contents_content1_body_ibx_csSerial", "618282")                      # 일련번호
        await page.fill("input#mf_ssgoTopMainTab_contents_content1_body_ibx_btprNm", "이찬민")                          # 당사자명 (본인성함)

        print("정보 입력 완료! 이제 화면의 '자동방지숫자'를 입력하고 [검색]을 누르세요.")
        
        # 브라우저를 닫지 않고 사용자가 확인할 수 있게 무한 대기
        await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(open_my_case())