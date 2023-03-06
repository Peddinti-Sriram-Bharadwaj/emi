document.querySelector('.myresults').style.display="none";        //not displayed before computing
document.querySelector('.mydisplay').style.display="none";        //not displayed before computing results
document.querySelector('#compute').addEventListener('click',function(emi){
  
    document.querySelector('.myresults').style.display='flex';    //display elements after computing
    document.querySelector('.mydisplay').style.display="flex";    //display elements after computing

    const parent=document.querySelector('.tableHolder');          

    parent.innerHTML='';                                         //clear existing wrappers and data everytime new data is computed

    const tbl = document.createElement('table');
    parent.appendChild(tbl);

    //set attributes to the table element
    tbl.setAttribute("id",'example');
    tbl.setAttribute('class','display nowrap');
    tbl.setAttribute('style', 'width : 100%')


    // pre-process user prompt
    const p = parseFloat(document.getElementById('amt').value);
    const t = parseFloat(document.getElementById('time').value)*12;
    const r = parseFloat(((document.getElementById('rate').value)/12)/100);

    //compute results
    const monthly =parseFloat((p*r*((1+r)**t))/(((1+r)**t)-1)).toFixed(2);
    const totamount=parseFloat(monthly*t).toFixed(2);

    console.log(totamount);
    console.log(monthly);

    //display summer
    document.querySelector('.myamount').textContent=`the total amount to be paid is :${totamount}`;
    document.querySelector('.mymonthly').textContent=`monthly amount to be paid is :${monthly}`;
    document.querySelector('.myinterest').textContent=`the total interest to be paid is :${(totamount-p).toFixed(2)}`;


    //create a table dynamically
    function generateTable() {

        const months = parseInt(t);

        //create table semantic elements
        const tblhead = document.createElement("thead");
        const tblBody = document.createElement("tbody");
        const tblfoot= document.createElement("tfoot");


        const heads = document.createElement('tr');
        const head1 = document.createElement('th');
        const head2 = document.createElement('th');
        const head3 = document.createElement('th');
        const head4 = document.createElement('th');

        head1.appendChild(document.createTextNode('month'));
        heads.appendChild(head1);

        head2.appendChild(document.createTextNode('monthly amount'));
        heads.appendChild(head2);

        head3.appendChild(document.createTextNode('amount paid so far'));
        heads.appendChild(head3)

        head4.appendChild(document.createTextNode('amount due'));
        heads.appendChild(head4)

        const foots = document.createElement('tr');
        const foot1 = document.createElement('th');
        const foot2 = document.createElement('th');
        const foot3 = document.createElement('th');
        const foot4 = document.createElement('th');

        foot1.appendChild(document.createTextNode('month'));
        foots.appendChild(foot1);

        foot2.appendChild(document.createTextNode('monthly amount'));
        foots.appendChild(foot2);

        foot3.appendChild(document.createTextNode('amount paid so far'));
        foots.appendChild(foot3)

        foot4.appendChild(document.createTextNode('amount due'));
        foots.appendChild(foot4)


        tblhead.appendChild(heads);
        tblfoot.appendChild(foots);       

        
    
        // create rows for the table.

        for (let i = 0; i < months; i++) {
    
            const row = document.createElement("tr");
            var curr =parseInt(i);

                    
            const cell1 = document.createElement("td");
            const cellText1 = document.createTextNode(`month ${curr+1}`);
            cell1.appendChild(cellText1);
            row.appendChild(cell1);

            const cell2 = document.createElement("td");
            const cellText2 = document.createTextNode(`${monthly}`);
            cell2.appendChild(cellText2);
            row.appendChild(cell2);

            const cell3 = document.createElement("td");
            const cellText3 = document.createTextNode(`${(monthly*(i+1)).toFixed(2)}`);
            cell3.appendChild(cellText3);
            row.appendChild(cell3);

            const cell4 = document.createElement("td");
            const cellText4 = document.createTextNode(`${(monthly*(months-(i+1))).toFixed(2)}`);
            cell4.appendChild(cellText4);
            row.appendChild(cell4);


            tblBody.appendChild(row);
          }
      
          
      
        // put the <thead>, <tbody> and <tfoot> in the <table>
       
        
        
        
        tbl.appendChild(tblhead);
        tbl.appendChild(tblBody);
        tbl.appendChild(tblfoot);
        

        
      }

    
    generateTable();

    // make use of jquery datatables to modify the bare HTML table
      $('#example').DataTable( {
          responsive: true,
          columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: 1 },
            { responsivePriority: 3, targets: 2 },
            { responsivePriority: 4, targets: 3 },
        ],

        breakpoints: [
          {name: 'bigdesktop', width: Infinity},
          {name: 'meddesktop', width: 1480},
          {name: 'smalldesktop', width: 1280},
          {name: 'medium', width: 1188},
          {name: 'tabletl', width: 1024},
          {name: 'btwtabllandp', width: 848},
          {name: 'tabletp', width: 768},
          {name: 'mobilel', width: 480},
          {name: 'mobilep', width: 320}
        ],

        order: []
      } );
    

})