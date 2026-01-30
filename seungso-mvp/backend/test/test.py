from pathlib import Path
import pandas as pd

# 1. 경로 설정 (현재 파일 위치 기준)
current_dir = Path(__file__).parent.resolve()
backend_root = current_dir.parent 

# 2. 불러올 파일과 저장할 파일 경로 정의
data_dir = backend_root / "data"
input_file = data_dir / "execution.csv"
output_file = data_dir / "execution_cleaned.csv"

# 3. 데이터 처리 로직 (생략 가능)
if input_file.exists():
    df = pd.read_csv(input_file)
    
    # 날짜 처리 (앞서 정의한 로직)
    df['date_obj'] = pd.to_datetime(df['stats_ym'], format='%b-%y')
    df['year'] = df['date_obj'].dt.year
    df['month'] = df['date_obj'].dt.month
    
    # 불필요한 객체 제거 후 결과 확인
    df = df.drop(columns=['date_obj']).sort_values(['year', 'month'])
    
    df.to_csv(output_file, index=False, encoding='utf-8-sig')
    
    print(f"✅ 가공된 데이터가 저장되었습니다: {output_file}")
else:
    print("❌ 원본 파일을 찾을 수 없습니다.")
