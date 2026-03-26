import pandas as pd
from pathlib import Path
from dotenv import load_dotenv
import os
from supabase import create_client

current_file = Path(__file__).resolve()
scripts_dir = current_file.parent
backend_root = scripts_dir.parent
project_root = backend_root.parent

csv_path = backend_root / "data" / "execution.csv"
env_path = project_root / ".env.local"
load_dotenv(env_path)

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

def run_sync():
    if not url or not key:
        print("❌ 환경변수를 로드할 수 없습니다. .env.local 파일을 확인하세요.")
        return
    
    supabase = create_client(url, key)

    if not csv_path.exists():
        print(f"❌ CSV 파일을 찾을 수 없습니다: {csv_path}")
        return

    print(f"📊 데이터 처리 중: {csv_path.name}")
    df = pd.read_csv(csv_path)
    
    df['date_obj'] = pd.to_datetime(df['stats_ym'], format='%b-%y')
    df['year'] = df['date_obj'].dt.year
    df['month'] = df['date_obj'].dt.month
    
    # DB 테이블 구조에 맞는 컬럼만 추출
    final_df = df[['stats_ym', 'execution_count', 'year', 'month']]
    records = final_df.to_dict(orient='records')

    try:
        response = supabase.table("notary_stats").upsert(
            records, 
            on_conflict="stats_ym"
        ).execute()
        
        print(f"✅ 동기화 완료! 총 {len(records)}개의 데이터가 최신화되었습니다.")
    except Exception as e:
        print(f"❌ 전송 중 에러 발생: {e}")

if __name__ == "__main__":
    run_sync()
