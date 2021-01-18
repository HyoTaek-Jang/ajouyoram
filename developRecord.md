# 개발일지

### 21년 1월 8일

- aws 서버생성 - putty로 open
- workbench로 csv 데이터셋 임포트

  - db table 초기 설계

  ```
  CREATE TABLE `yoraming`.`cyber_2020` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `classification` VARCHAR(45) NOT NULL,
  `recommendedGrade` VARCHAR(45) NOT NULL,
  `prerequisite` VARCHAR(45) NULL,
  `credit` INT NOT NULL,
  `group` VARCHAR(5) NULL,
  `remark` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
  COMMENT = '사이버보안학과 2020년도 요람 데이터';

  ```
### 21년 1월 15일
- 로컬 db에서 aws sql 인증에러가 떳다. 해결방법은 aws root로 들어가고 mysql 스키마로 들어가서 비밀번호를 변경하
- alter user 'new_master_user'@'%' identified with mysql_native_password by '1234'; 를 사용함.
- 그리고 flush privileges로 변경사항을 적용함.