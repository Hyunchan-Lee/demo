import { useState } from 'https://esm.sh/preact/hooks';
import { h } from 'https://esm.sh/preact'
import htm from 'https://esm.sh/htm';

AOS.init({
    duration: 800,
  });

const html = htm.bind(h)

function oninputPhone(target) {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
}

function phoneNumberCheck(number) {
  let result = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  return result.test(number);
}

const FormModal = ({ opened, close }) => {
  const [agree, setAgree] = useState(true)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const submitAvailable = phoneNumberCheck(phone) && name !== '' && name.length > 1 && agree;

  const [pending, setPending] = useState(false)

  const host = {
    'local': 'http://localhost:8081',
    'prod': 'http://localhost:8081'
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const today = new Date();
    const body = {
      name,
      phone_number: phone,
      request_date: today.getTime()
    }

    setPending(true)
    fetch(`/api/v1/public/create`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(res => {
      if (res.status === 200) {
        alert('신청이 완료되었어요')
        window.location.reload()
      } else {
        alert('일시적인 오류가 발생했습니다.')
        window.location.reload()
      }
    })
  }

  if (!opened) return html`<></>`;

  return html`
  <div>
      <div class="fixed w-[100vw] h-[100vh] bg-[rgb(0,0,0,0.20)] flex items-center justify-center z-[101]" onClick=${close}>
      </div>
      <div class="fixed left-1/2 bottom-[20px] translate-x-[-50%] max-w-[calc(500px)] w-[calc(100vw-40px)] z-[102]">
        <div data-aos="fade-up" class="w-full">
          <form onSubmit=${onSubmit} class="p-[28px_20px] rounded-[16px] bg-white flex flex-col items-center justify-start gap-[20px] text-[14px]">
            <div class="flex items-start w-full">
              <span class="text-[#35424F] text-[22px] font-[700] leading-[1.5] tracking-tighter-[-0.44px]">지금 바로 신청하시면<br />바로 연락드릴게요</span>
            </div>
            <div class="w-full p-[12px] bg-white border-[1px] border-[#EEE] rounded-[8px] placeholder:text-[#C4C4C4] text-[#222]">
              <input class="outline-none text-[14px]" type="text" placeholder="성함" maxlength="17" value=${name} onChange=${(e) => setName(e.target.value)}/>
            </div>
            <div class="w-full p-[12px] bg-white border-[1px] border-[#EEE] rounded-[8px] placeholder:text-[#C4C4C4] text-[#222]">
              <input class="outline-none w-full text-[14px]" type="text" placeholder="휴대폰 번호" maxlength="13" value=${phone} oninput=${(e) => oninputPhone(e.target)} onChange=${(e) => setPhone(e.target.value)}/>
            </div>

            <div class="inline-flex items-center w-full justify-start gap-[4px] z-[103]">
              <label class="flex items-center cursor-pointer relative z-0" for="check">
                <input
                  type="checkbox"
                  checked=${agree}
                  onChange=${(e) => setAgree(e.target.checked)}
                  class="peer h-[16px] w-[16px] cursor-pointer transition-all appearance-none"
                  id="check" />
                <span class="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 peer-checked:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10.411 17.8537C10.0717 17.8537 9.73236 17.7406 9.50614 17.4013L4.30308 12.1982C3.73752 11.6327 3.73752 10.8409 4.30308 10.2754C4.86863 9.70985 5.6604 9.70985 6.22595 10.2754L10.411 14.4604L17.8763 6.99521C18.4418 6.42966 19.2336 6.42966 19.7991 6.99521C20.3647 7.56076 20.3647 8.35253 19.7991 8.91808L11.429 17.2882C11.0897 17.7406 10.7503 17.8537 10.411 17.8537Z" fill="#C4C4C4"/>
                  </svg>
                </span>
                <span class="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10.411 17.8537C10.0717 17.8537 9.73236 17.7406 9.50614 17.4013L4.30308 12.1982C3.73752 11.6327 3.73752 10.8409 4.30308 10.2754C4.86863 9.70985 5.6604 9.70985 6.22595 10.2754L10.411 14.4604L17.8763 6.99521C18.4418 6.42966 19.2336 6.42966 19.7991 6.99521C20.3647 7.56076 20.3647 8.35253 19.7991 8.91808L11.429 17.2882C11.0897 17.7406 10.7503 17.8537 10.411 17.8537Z" fill="#0074F9"/>
                  </svg>
                </span>
              </label>
              <a 
                href="#" 
                class="text-[#5D6169] text-[14px] font-[400] leading-[20px] tracking-tighter-[-0.6px]" 
                onClick=${(e) => { 
                  e.preventDefault();
                  document.getElementById('check').click();
                  }}
              >
                개인정보 수집 이용 동의할게요
              </a>
            </div>
            <div class="flex w-full gap-[8px] self-stretch">
              <input type="button" value="닫기" disabled=${pending} class="basis-1/5 flex-grow-0 flex-shrink-0 rounded-[12px] p-[12px] flex items-center justify-center text-[#4B5A67] disabled:bg-[rgba(242,244,246,0.4)] bg-[#F2F4F6]" onClick=${close}/>
              <input type="submit" value="신청하기" disabled=${!submitAvailable && !pending} class="basis-4/5 flex-grow-0 flex-shrink-0 rounded-[12px] p-[12px] flex items-center justify-center text-white disabled:bg-[rgba(0,116,249,0.4)] bg-[#0074F9]" onclick=${() => gtag_report_conversion(host.prod)}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
}

export default FormModal;
