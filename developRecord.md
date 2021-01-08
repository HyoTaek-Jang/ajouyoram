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
