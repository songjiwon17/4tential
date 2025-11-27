import express from 'express';
import axios from 'axios';
import cors from 'cors';
import https from 'https';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * ==============================================================================
 * 식단 영양 정보 중계 서버
 * ==============================================================================
 *
 * 역할:
 * 1. CORS 문제 해결: 브라우저(React)에서 공공데이터 포털로 직접 요청 시 발생하는 보안 차단 우회
 * 2. 보안 강화: API Key를 서버에 숨겨서 클라이언트에 노출되지 않도록 함
 * 3. 데이터 정제: 공공데이터 API의 광범위한 검색 결과 중 정확히 일치하는 데이터 1개만 필터링
 *
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env 파일을 로드.
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
// 모든 도메인에서의 요청 허용.
app.use(cors());

const PORT = 4000;
// 서버 환경변수에서 API 키 로드.
const SERVICE_KEY = process.env.FOOD_API_KEY;

// SSL 인증서 문제 해결을 위한 에이전트 설정.
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

app.get('/api/food', async (req, res) => {
  try {
    const { foodName } = req.query;
    console.log(`[요청 받음] 검색어: ${foodName}`);
    // 공공데이터 API URL 조립.
    let url =
      'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02';
    url += `?serviceKey=${SERVICE_KEY}`;
    url += `&type=json`;
    url += `&pageNo=1`;
    url += `&numOfRows=100`;
    url += `&FOOD_NM_KR=${encodeURIComponent(foodName)}`;
    // 외부 API 요청 전송.
    const response = await axios.get(url, { httpsAgent, timeout: 10000 }); // 10초 내 응답 없으면 연결 종료.

    console.log('---------------------------------------------------');
    console.log('[응답 상태 코드]:', response.status);
    console.log('[응답 데이터 원본]:', response.data);
    console.log('---------------------------------------------------');

    // 데이터 구조 확인 및 반환.
    const items = response.data.body.items || [];
    console.log(items);
    const filtered = items.filter(
      (item) => item.FOOD_NM_KR.trim() === foodName
    );

    // 검색 결과 처리.
    if (filtered.length === 0) {
      console.log('검색 결과 없음');
      return res.json(null);
    }
    console.log(`[응답 성공] 데이터 ${filtered.length}건 발견`);
    res.json(filtered[0]);
  } catch (err) {
    console.error('[서버 에러 발생]');
    console.error(err.message);
    res.status(500).json({ error: 'API 호출 실패' });
  }
});

// 서버 실행.
app.listen(PORT, () => {
  console.log(`-----------------------------------------------`);
  console.log(`프록시 서버가 정상적으로 실행되었습니다!`);
  console.log(`주소: http://localhost:${PORT}`);
  console.log(`-----------------------------------------------`);
});
