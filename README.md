<!-- Heading -->

# zoom CloneCoding
<br/>


**각 코드의 동작 과정에 대한 설명을 주석처리해두었음.**

자세한 리뷰는 아래 링크에서 서술함.


<br/>
<br/>

> ## :gem:       **JS**
> ## :gem:       **Websocket**

<br/>
<br/>
<br/>

**npm init - y and package.json**
package.json 파일은 프로젝트 정보와 의존성을 기록하고 관리하는 파일입니다.
패키지를 추가로 설치할 때마다 패키지 정보가 자동으로 입력되기도 하고
package.json에 입력된 내용을 토대로 프로젝트의 개발 환경을 구축할 수도 있어요

**npm i nodemon -D**
nodemon은 소스코드를 수정할 때마다 코드의 변화를 감지해서 자동으로 서버 프로그램을 재시작 해주는 도구입니다.
-D옵션은 개발 및 테스트를 위해 설치하는 패키지라는 의미입니다.

**npm i @babel/core @babel/cli @babel/node @babel/preset-env -D**
babel 관련 패키지를 설치합니다.
패키지를 설치할 때 패키지명을 공백으로 구분해서 입력하면 패키지를 한번에 여러개 설치할 수 있어서
위와 같이 적어도 동작합니다!!

**npm i express**
import와 express를 이용해 express를 가져올 수 있음

**__dirname**
 dirname에 경로 이름을 지정하면 마지막 슬래시('/') 문자로 시작되는 모든 글자들을 지우고 결과를 반환한다.
 
**npm i ws**
ws란 ? 웹소켓의 규칙에 맞게 구현한 핵심 기능을 제공하는 패키지

<br/>
<br/>
<br/>

> ## :gem:       **보완 및 궁금한 점**

<br/>
<br/>
<br/>
