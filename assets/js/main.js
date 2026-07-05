
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
  const cohort=params.get('cohort');
  if(cohort){
    const selector=cohort.toLowerCase().includes('cape') ? 'Cape Town' : 'Sun City';
    document.querySelectorAll('input[name="cohort"]').forEach(r=>{ if(r.value.includes(selector)) r.checked=true; });
  }
})();
