// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const url_base = "https://smoothcomp.com/sv/profile/";
const id1: string = "376237"; // JH
const id2: string = "171737";
// marcus: 171737
// adin: 627145

const getData = async (id: string) => {
  return await fetch(url_base.concat(id).concat("/events")).then((resp) =>
    resp.json(),
  );
};
type ArrayMemeber = {
  opponent_name: string;
  // outcome: boolean;
};

const opponentsForId1: string[] = [];
const promOfId1 = getData(id1).then((json) => {
  for (let i in json.data) {
    for (let j in json.data[i].registrations) {
      for (let k in json.data[i].registrations[j].matches) {
        const outcome: boolean =
          json.data[i].registrations[j].matches[k].is_winner;
        const name: string =
          json.data[i].registrations[j].matches[k].opponents[0].name;
        opponentsForId1.push(name);
      }
    }
  }
});

const opponentsForId2: string[] = [];
const promOfId2 = getData(id2).then((json) => {
  for (let i in json.data) {
    for (let j in json.data[i].registrations) {
      for (let k in json.data[i].registrations[j].matches) {
        const outcome: boolean =
          json.data[i].registrations[j].matches[k].is_winner;
        const name: string =
          json.data[i].registrations[j].matches[k].opponents[0].name;
        opponentsForId2.push(name);
      }
    }
  }
});
// .then(() =>
//   console.log(opponentsForId1.filter((opp) => opponentsForId2.includes(opp))),
// );
const promises = Promise.all([promOfId2, promOfId2]);
promises.then((_) => {
  console.log(opponentsForId1);
  console.log(opponentsForId2);
  const oppsInCommon = new Set();
  opponentsForId1
    .filter((opp) => opponentsForId2.includes(opp))
    .forEach((elem) => oppsInCommon.add(elem));
  console.log(oppsInCommon);
});

// const oppsInCommon: string[] = []; /*opponentsForId1.filter((name) => {
//   return opponentsForId2.indexOf(name) !== -1;
// }); /*.filter((opp) =>
//   opponentsForId2.includes(opp),
// );*/
// // for (let i = 0; i < opponentsForId1.length; i++) {
// //   if (i includes)
// // }

// // console.log(oppsInCommon);
