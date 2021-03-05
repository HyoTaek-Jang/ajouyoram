# 학습일지

### 21년 1월 8일

aws에 접속하기위해 이것저것 다 해봤는데 왜 안되지
일단 윈도우에서 리눅스로 파일 옮기려고 scp썻는데 실행
아까 cmd에서 접속 됐는데 이젠 또 안되고...
리눅스에서 윈도우 경로로 이동해서 실행해도 안되고...
다 안돼...

### aws접속

- putty를 통해 해결

### 서버에서 sql다루기

- 워크밴치에서 공유아이피와 아디 비번으로 해결
- 혹은 sudo /usr/bin/mysql (여기가 sql 폴더) -u ~~ -p

### sql에 엑셀 넣기

- https://okky.kr/article/401595 링크 참고
- 한글이 안들어가면 csv로 저장하고 메모장에서 utf-8로 저장하고 임포트하면 해결가능
- 근데 왜 임포트하고 워크벤치 네이게이션에 안ㅇ뜰까?

* 각 데이터테이블마다 권장학기의 데이터가 제대로 안들어왔음 수정요망
* 그룹핑방법
* 데이터 명명(전필, 교필 이러한 내용) 통일

### 21년 1월 14일

- 요라밍 데이터 긁기.
- 학점관련 정보는 url "/uni/uni/cour/curi/findGrdtCourCurriculum.action"로 변경하면 됨. 연도랑 학과고유코드는 동일.
- 전 학과 데이터 넣기. 문제 : 만약 비어있는 제이슨 처리?, 테이블에 모든 학과를 넣지만 없는 과는 없애고 있는 과 리스트를 만들어야 할듯
- json에 데이터가 있는지 확인

```
if (Array.isArray(majorArray) && majorArray.length)
```

- 하아 mysql 개빡친다 개ㅐ새ㅐ......
- 내 생각엔 ''가 들어가면 안되는듯 와이....? 그리고 밸류에 ?는 되는데 왜 테이블네임에는 안돼? 시부레
- 기존에 하려고 한 프라이머리 키가 중복이 발생함. 걍 없앴음.

- aws node 연결

```
var db = mysql.createConnection({
  host: "ec2-18-220-41-9.us-east-2.compute.amazonaws.com",
  // port: "3306",
  user: "new_master_user",
  password: "1234",
  database: "yoraming",
});
```

### 1월 15일

- aws 서버 연결법
- 포트를 개방해줘야함
- 보안그룹 - 런쳐위자드 -> 인바운드 3000번 포트생성

- 로컬노드에서 aws mysql 연결시 인증 오류 발생
- 해결법 : aws mysql root로 접속후 스키마는 mysql로 접속
- mysql 비밀번호를 변경하는거라고함..?
- alter user 'new_master_user'@'%' identified with mysql_native_password by '1234'; 입력
- flush privileges; 로 변경사항 적용

### 1월 16일

- 협업이 제대로 안되고 업무 분담이 안되는 듯하여 슬랙을 제안 pm, pl을 뽑는 과정이 필요할듯
- 슬랙구성 완료

## 21년 1월 31일

- 프론트와 통신 테스트!
- post로 year major 던지면 sql 뒤져서 데이터 던져주는거!
- 저번에도 까먹었지만 단어 포함된거 찾는 sql 구문

```
  let query = `SELECT * FROM subj_${year} WHERE major like '%${major}%'`;

저기 % %로 묶으면 포함된 단어 검색해서 보여줌
```

### res.send json end

```
res.send()는 send에 전해진 argument에 따라서 Content-type이 자동적으로 만들어진다. 이게 기본이다.
res.json()은 json이 아닌 것도 json 형식으로 바꾸어서 보내준다. 즉 content-type 헤더를 application/JSON으로 고정한다. 그런데 결국 res.json()도 마지막에 res.send()를 호출한다.
res.end()는 보내줄 아무 데이터도 없는데 response를 끝내고 싶을 때 사용한다.
ex) res.status(400).end();
```

### login테스트 앱에서 넘어오는 정보

```
0|www    | {
0|www    |   userEmail: 'yu04038@ajou.ac.kr',
0|www    |   name: '조용진',
0|www    |   uid: 'AEWJ2xFVZFXn5APLyCI67HyOZii1',
0|www    |   year: '2019',
0|www    |   major: 'media'
0|www    | }
```

## 테스트 성공!

## 21년 2월 17일

- db 다시 손댐
- 일단 사용자 이수 과목 추가에 대한 부분은

```
0. 사용자는 자신의 졸업요람을 추가할때 연도와 학과를 선택하여 추가함.
1. 사용자가 몇년도 시간표를 추가하는지 입력하면, 그 연도 해당 학과 과목 데이터(기본적으로, 과목이름 과목id, 학점, 학수구분 etc)를 프론트로 보냄. ( 사실 저 데이터에서 과목이름, 학수구분 이런건 사용자에게 보여주기 위함일뿐임.)
2. 프론트는 그 과목 데이터를 사용자에게 보내주고, 사용자가 과목을 선택할때마다, 그 과목id, 학점을 받고(졸업요람 통계를 위한), 수강학년과 학기(ex, 2-1, 1-1 이건 단지 사용자에게 자신의 시간표를 보여줄때 사용하려고!)를 받음
3. 받은 과목 id를 기본적으로 자신의 졸업요람 id와 비교하여 일치되는 과목(요람 인정과목)을 사용자에게 보여주고, 만약 사용자가 추가하고 싶을 시, 자신의 졸업 요람에 있는 과목을 선택하여, 그 과목의 id를 추가함(recognitionSbjt).
- 만약 전선이나 교양은 해당요람에 없을 수 있기에 과목을 선택하는 것이 아닌, 단순히 인정 학점을 채워주는 것도 필요할듯
```

### 21년 2월 22일

- 어제 회의를 통해 만들어진 새로운 기획과 테이블 구성대로
- 모델링 후, 테이블 생성 완료

- 배운 사실 : fk 이름은 중복되면 안됨.

### 21년 2월 25일

- api 명세 제작. 이거 있으면 훨씬 수월하게 개발될듯
- 요라밍 db 재구성 및 서버 MVC패턴으로 제작

### 21년 2월 28일

- api명세 회의
- 각자 맡을 기능부분 체크
- 건의사항 테이블 및 기능 추가, 공지사항 테이블 추가 해야함 - ok
- 공지사항 어케 키워드 알림 띄울지 고민 ㄱ
- 일단 api 구현부터하고 공지사항 생각하쟈

### 21년 3월 1일

- insertSbjt 구현
- 삽입은 쉬운데, 이게 우리가 처음 생각한게 해당 아이디랑 학기를 통해 쫙 비우고 새로 삽입하기로 해씀
- 근데 쫙 비울 수는 있는데 그 테이블이 fk로 연결돼있어서 그것도 비워야함..
- 아 아이디어 떠오름 ㅎ
  1. action을 null로 주고
  2. rec테이블에서 null된거 다 지움
  3. 끝
- ㅇㅋ 잘 작동함 굿!!!!!!!!!!!!
- 배운점 sql isnull, lastinsert, 리눅스 폴더 삭제, mysql where 두개, join

### 21년 3월 2일

- 요람 불러오려고 하는데 아 드럽게 복잡함.
- 테이블이 세개가 엃혀있어서 흠.... 계산 할 것도 많고... 어케 넘겨줘야할지...
- 일단 join을 써서 select해야할듯
- join해서 해결함!
- 예아!!! get sbjt 기능 구현함

```javascript
const sortSbjt = {
  totalCredit: 0,
  totalGrade: 0,
  majorR: 0,
  majorS: 0,
  univR: 0,
  basicR: 0,
};

for (let i of comSbjtData) {
  sortSbjt.totalCredit += i.comSbjt_credit;
  sortSbjt.totalGrade += i.comSbjt_grade;
  sortSbjt[`${i.recSbjt_recCategory}`] += i.comSbjt_credit;

  if (!(i.comSbjt_date in sortSbjt)) {
    sortSbjt[`${i.comSbjt_date}`] = {
      totalCredit: 0,
      totalGrade: 0,
      majorR: [],
      majorS: [],
      univR: [],
      basicR: [],
    };
  }
  sortSbjt[`${i.comSbjt_date}`].totalCredit += i.comSbjt_credit;
  sortSbjt[`${i.comSbjt_date}`].totalGrade += i.comSbjt_grade;
  //prettier-ignore
  sortSbjt[`${i.comSbjt_date}`][`${i.recSbjt_recCategory}`].push(i.comSbjt_name);
}
```

- 이런식으로 일단 객체를 만들고 만약에 키가 없다면 키랑 벨류를 초기화해주고 값을 담았음

### 21년 3월 4일

- 학기별 데이터를 뽑아주는걸 했다!
- 맨 처음에는 조인까지해서 한번에 하려고 했는데 그러면 insert할때랑 데이터 형식이 달라짐
- 음 인정과목이 두개면 그냥 통 sbjt가 두개 생겨서!
- 쿼리를 두번써서 인정과목에 리스트가 또 생기게 처리함
- 그래서 for문으로 쿼리를 돌렸는데 쿼리를 안기다리고 바로 리졸브해서, await 걸어줌! 저번에 아주수강할때 타이머 건 느낌!

```javascript
  static getRecSbjtDate(dateSbjtData) {
    return new Promise(async (resolve, reject) => {
      for (let i of dateSbjtData) {
        i.recognitionSbjt = await this.processRecSbjt(i.comSbjt_id);
      }
      resolve(dateSbjtData);
    });
  }

  static processRecSbjt(comSbjt_id) {
    return new Promise((resolve, reject) => {
      db.query(selectSbjtRecQuery, [comSbjt_id], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
```

### 21년 3월 5일

- user get, add 기능 추가

  - 근데 안스는 GET이랑 delete할때 body를 못넣는다 한다. 그래서 쿼리로 처리해줌

- 그리고 공지사항 크롤링 부분 추가 완료

- 명세서 세부내용 작성 완료
