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