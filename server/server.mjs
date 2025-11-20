import express from 'express';
import axios from 'axios';
import cors from 'cors';
import https from 'https';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
app.use(cors());

const PORT = 4000;

const SERVICE_KEY = process.env.FOOD_API_KEY;

// SSL 인증서 문제 해결을 위한 에이전트 설정
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

app.get('/api/food', async (req, res) => {
  try {
    const { foodName } = req.query;
    console.log(`[요청 받음] 검색어: ${foodName}`);

    let url =
      'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02';
    url += `?serviceKey=${SERVICE_KEY}`;
    url += `&type=json`;
    url += `&pageNo=1`;
    url += `&numOfRows=100`;
    url += `&FOOD_NM_KR=${encodeURIComponent(foodName)}`;

    const response = await axios.get(url, { httpsAgent, timeout: 10000 });

    console.log('---------------------------------------------------');
    console.log('[응답 상태 코드]:', response.status);
    console.log('[응답 데이터 원본]:', response.data);
    console.log('---------------------------------------------------');

    // 데이터 구조 확인 및 반환
    const items = response.data.body.items || [];
    console.log(items);
    const filtered = items.filter(
      (item) => item.FOOD_NM_KR.trim() === foodName
    );
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

app.listen(PORT, () => {
  console.log(`-----------------------------------------------`);
  console.log(`프록시 서버가 정상적으로 실행되었습니다!`);
  console.log(`주소: http://localhost:${PORT}`);
  console.log(`-----------------------------------------------`);
});
