
(function(){
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));}
  document.querySelectorAll('a[href*="#"]').forEach(a=>{
    a.addEventListener('click',()=>{ if(nav) nav.classList.remove('open'); });
  });
  const addBtn=document.querySelector('[data-add-participant]');
  const target=document.getElementById('additional-participants');
  let count=1;
  if(addBtn&&target){
    addBtn.addEventListener('click',()=>{
      if(count>=10) return;
      count++;
      const div=document.createElement('div');
      div.className='form-card participant-card';
      div.innerHTML=`<div class="form-card-head"><span class="number-dot">${count}</span><h2>Additional Participant ${count}</h2></div>
      <div class="form-grid two">
      <label>Last Name<input name="participant_${count}_last_name"></label>
      <label>First Name<input name="participant_${count}_first_name"></label>
      <label>Position / Job Title<input name="participant_${count}_position"></label>
      <label>Email Address<input type="email" name="participant_${count}_email"></label>
      </div>`;
      target.appendChild(div);
      if(count>=10) addBtn.style.display='none';
    });
  }
  const params=new URLSearchParams(window.location.search);
  const brochureResources=document.querySelector('[data-brochure-resources]');
  if(brochureResources && params.get('form')==='brochure'){
    brochureResources.hidden=false;
    updateUpcomingSession();
  }
  async function updateUpcomingSession(){
    const statement=brochureResources.querySelector('[data-upcoming-session]');
    const pdfNote=brochureResources.querySelector('[data-resource-session-note]');
    if(!statement) return;
    if(pdfNote) pdfNote.hidden=false;
    const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const todayParts=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Johannesburg',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const today=Number(todayParts.find(p=>p.type==='year').value+todayParts.find(p=>p.type==='month').value+todayParts.find(p=>p.type==='day').value);
    try{
      const response=await fetch('dates.html',{cache:'no-cache'});
      if(!response.ok) return;
      const schedule=new DOMParser().parseFromString(await response.text(),'text/html');
      const sessions=Array.from(schedule.querySelectorAll('.dates-grid .date-card')).map(card=>{
        const destination=card.querySelector('h2')?.textContent.trim();
        const publishedDates=card.querySelector('.eyebrow')?.textContent.trim() || '';
        // Read the published "1 - 4 December 2026" date range directly.
        const match=publishedDates.match(/^(\d{1,2})(?:\s+([a-z]+))?\s*[-–—]\s*(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i);
        if(!destination || !match) return null;
        const [,first,startMonthName,last,monthName,yearText]=match;
        const month=months.findIndex(m=>m.toLowerCase()===monthName.toLowerCase());
        const startMonth=startMonthName?months.findIndex(m=>m.toLowerCase()===startMonthName.toLowerCase()):month;
        const startDay=Number(first),endDay=Number(last),year=Number(yearText);
        if(month<0 || startMonth<0 || startDay<1 || (startMonth===month && endDay<startDay) || endDay>new Date(Date.UTC(year,month+1,0)).getUTCDate()) return null;
        const dates=startMonth===month?`${startDay}–${endDay} ${months[month]} ${year}`:`${startDay} ${months[startMonth]} – ${endDay} ${months[month]} ${year}`;
        return {destination,dateKey:year*10000+(startMonth+1)*100+startDay,dates};
      }).filter(session=>session && session.dateKey>=today).sort((a,b)=>a.dateKey-b.dateKey);
      const next=sessions[0];
      if(!next) return;
      statement.textContent=`Planning to attend ${next.destination}, ${next.dates}? Download these PDFs to request approval and organise your team booking.`;
      if(pdfNote) pdfNote.hidden=next.destination==='Cape Town' && next.dates==='1–4 December 2026';
    }catch(error){
      // Keep the general message if the published schedule cannot be loaded.
    }
  }
  const cohort=params.get('cohort');
  if(cohort){
    const c=cohort.toLowerCase();
    const selector=c.includes('cape') ? 'Cape Town' : 'Sun City';
    const year=(c.match(/20\d\d/)||[])[0];
    const match=Array.from(document.querySelectorAll('input[name="cohort"]')).find(r=>r.value.includes(selector) && (!year || r.value.includes(year)));
    if(match) match.checked=true;
  }
})();
