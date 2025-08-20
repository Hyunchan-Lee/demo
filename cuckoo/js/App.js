import htm from 'https://esm.sh/htm';
import { h, render } from 'https://esm.sh/preact'
import FormModal from './FormModal.js';

AOS.init({
    duration: 800,
  });
  
const html = htm.bind(h)

const formSection = document.getElementById('form-section')
const applyButton = document.getElementById('button-apply')

function closeForm() {
  render(html`<${FormModal} opened=${false}/>`, formSection)
}
applyButton.onclick = () => render(html`<${FormModal} close=${closeForm} opened=${true}/>`, formSection)
window.openApply = () => render(html`<${FormModal} close=${closeForm} opened=${true}/>`, formSection)

document.addEventListener("DOMContentLoaded", () => {
  const countdownEl = document.getElementById("event-countdown");
  if (!countdownEl) return;

  let days = 7; // 시작값
  let direction = -1; // -1: 줄어듦, +1: 늘어남

  setInterval(() => {
    countdownEl.textContent = `이벤트 종료까지 ${days}일 남았어요`;

    days += direction;

    // 1일 → 다시 증가 / 7일 → 다시 감소
    if (days === 1) direction = +1;
    if (days === 7) direction = -1;
  }, 86400000); // 하루마다 변경 
});