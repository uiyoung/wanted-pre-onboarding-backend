# wanted pre-onboarding backend

원티드 프리온보딩 인턴십 10월 사전 과제

## 사용 기술

- 언어 및 프레임워크 : nodejs, express
- ORM : prisma
- DB : PostgreSQL

## 실행 방법

### RUN

1. Docker Compose 실행

   ```bash
   $ docker compose up -d
   ```

2. Docker express conatiner의 bash에 접속

   ```bash
   $ docker exec -it express_container bash
   ```

3. prisma migration 실행

   ```bash
   $ npx prisma migrate deploy
   ```

4. prisma seeding 실행
   ```bash
   $ npx prisma db seed
   ```

### 엔드포인트 호출 방법

| #   | Method | URI                    | Description            |
| --- | ------ | ---------------------- | ---------------------- |
| 1   | POST   | `/jobs`                | 채용공고 등록          |
| 2   | PATCH  | `/jobs/:id`            | 채용공고 수정          |
| 3   | DELETE | `/jobs/:id`            | 채용공고 삭제          |
| 4   | GET    | `/jobs/`               | 채용공고 목록 가져오기 |
| 5   | GET    | `/jobs?search={query}` | 채용공고 검색          |
| 6   | GET    | `/jobs/:id`            | 채용 상세 페이지 조회  |
| 7   | POST   | `/application`         | 채용공고에 지원        |

## 데이터베이스 테이블 구조

<img src=./erd.svg height=600>

- 회사는 N개의 채용공고를 등록한다(회사-채용공고 1:N)
- 사용자는 1개의 채용공고에 지원할 수 있다(사용자-채용공고 1:N)

## 요구사항 구현

1.  채용공고 등록

    - **Method:** POST
    - **URI:** `/jobs`
    - **Request Body:**
      - companyId: 회사 id(숫자),
      - position: 채용 포지션(문자열)
      - reward: 채용 보상금,
      - content: 채용 내용(문자열),
      - skills: 사용기술(배열)
    - **Response:**

      - 성공 시: 201 Created
        - 생성된 채용공고 객체
      - 실패 시: 500 Internal Server Error

    - e.g.

    ```bash
     curl --request POST \
      --url http://localhost:5000/jobs \
      --header 'Content-Type: application/json' \
      --data '{
      "companyId": 1,
      "position":"백엔드 주니어 개발자",
      "reward": 1000000,
      "content": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
      "skills":["Python"]
      }'
    ```

2.  채용공고 수정

    - **Method:** PATCH
    - **URI:** `/jobs/:id`
    - **URL Parameters:**
      - `id`: 채용공 ID (숫자)
    - **Request Body:**
      - position: 수정할 채용포지션(문자열)
      - reward: 수정할 채용보상금(문자열)
      - content: 수정할 채용내용(문자열)
      - skills: 수정할 고사용기술(배열)
    - **Response:**
      - 성공 시: 200 OK
        - 수정된 게시글 객체
      - 실패 시: 500 Internal Server Error
        - `message`: 'update post error'
    - e.g.

    ```bash
       curl --request PATCH \
        --url http://localhost:5000/jobs/1 \
        --header 'Content-Type: application/json' \
        --data '{
        "position":"백엔드 주니어 개발자",
        "reward": 1500000,
        "content": "원티드랩에서 백엔드 주니어 개발자를 '\''적극'\'' 채용합니다. 자격요건은..",
        "skills": ["Python"]
        }'
    ```

3.  채용공고 삭제

    - **Method:** DELETE
    - **URI:** `/jobs/:id`
    - **URL Parameters:**
      - `id`: 게시글 ID(숫자)
    - **Response:**
      - 성공 시: 200 OK
      - 실패 시: 500 Internal Server Error
    - **Description:** 게시글 ID를 기준으로 해당 게시글을 찾아 삭제합니다.
    - e.g.

    ```bash
    curl --request DELETE \
      --url http://localhost:5000/jobs/1 \
      --header 'Content-Type: application/json'
    ```

4.  채용공고 목록 가져오기

- 4-1. 전체목록 조회

  - **Method:** GET
  - **URI:** `/jobs`
  - **Response:**
    - 성공 시: 200 OK
      - 채용공고 목록 배열
    - 실패 시: 500 Internal Server Error
  - e.g.

  ```bash
  curl --request GET \
    --url http://localhost:5000/jobs
  ```

- 4-2. 채용공고 검색 기능
  - **Method:** GET
  - **URI:** `/jobs?search={query}`
  - **Query Parameters:**
    - `search`: 검색어(문자열)
  - **Response:**
    - 성공 시: 200 OK
      - 검색조건에 맞는 채용공고 배열(회사명, 채용포지션, 채용내용, 사용기술 검색결과)
    - 실패 시: 500 Internal Server Error
  - e.g.
  ```bash
  curl --request GET \
    --url 'http://localhost:5000/jobs?search=원티드'
  ```

5.  채용 상세페이지 조회

    - **Method:** GET
    - **URI:** `/jobs/:id`
    - **URL Parameters:**
      - `id`: 채용공고 ID(숫자)
    - **Response:**
      - 성공 시: 200 OK
        - 채용상세 페이지 객체 리턴(채용내용, 해당 회사가 올린 다른 채용공고 배열 추가)
      - 실패 시: 500 Internal Server Error
    - e.g.

    ```bash
    curl --request GET \
      --url http://localhost:5000/jobs/2
    ```

6.  채용공고 지원

    - **Method:** POST
    - **URI:** `/application`
    - **Request Body:**
      - position: 수정할 채용포지션(문자열)
      - reward: 수정할 채용보상금(문자열)
      - content: 수정할 채용내용(문자열)
      - skills: 수정할 고사용기술(배열)
    - **Response:**
      - 성공 시: 200 OK
      - 실패 시: 500 Internal Server Error
    - e.g.

    ```bash
    curl --request POST \
      --url http://localhost:5000/application \
      --header 'Content-Type: application/json' \
      --data '{
      "jobPostingId": 2,
      "userId": 1
      }'
    ```
