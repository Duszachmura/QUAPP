var Snum = 1;
var Srm = 0;
var flag = 0;
var isLast = 0;
var isFirst = 0;
var isOther = 0;
var Qnum = 0;
function addSets(){
    Srm++;
    if(flag==1){
        Qnum = Qrm;
    }

    var set = document.createElement("div");
    var Qinput = document.createElement("input");
    var Ainput = document.createElement("input");
    var Qlabel = document.createElement("label");
    var Alabel = document.createElement("label");
    var Qlabeltxt = document.createTextNode(`Question ${Snum}`);
    var Alabeltxt = document.createTextNode(`Answer ${Snum}`);
    var RmBttn = document.createElement("button");
    var RmBttntxt = document.createTextNode(`remove question ${Snum}`);

    set.setAttribute("id", `S${Snum}`);
    set.setAttribute("class", "set");
    Qinput.setAttribute("id", `Q${Snum}`);
    Ainput.setAttribute("id", `A${Snum}`);
    Qlabel.setAttribute("id", `Ql${Snum}`);
    Qlabel.setAttribute("for", `Q${Snum}`);
    Alabel.setAttribute("id", `Al${Snum}`);
    Alabel.setAttribute("for", `A${Snum}`);
    RmBttn.setAttribute("id", `${Snum}`);
    RmBttn.setAttribute("onclick", `rmBttn(this.id)`);

    set.appendChild(Qlabel);
    set.appendChild(Qinput);
    set.appendChild(Alabel);
    set.appendChild(Ainput);
    set.appendChild(RmBttn);

    Qlabel.appendChild(Qlabeltxt);
    Alabel.appendChild(Alabeltxt);

    RmBttn.appendChild(RmBttntxt);

    Snum++;
document.body.append(set);
}

function add5Sets(){
    var x = 5;
    while(x>0){
        addSets();
        x--;
    }
}

function rmBttn(id){
    function changeValues(){
        var Set = document.getElementById(`S${NumOfSetsB}`);

            var Qinput = document.getElementById(`Q${NumOfSetsB}`);
            var Qlabel = document.getElementById(`Ql${NumOfSetsB}`);

            var Ainput = document.getElementById(`A${NumOfSetsB}`);
            var Alabel = document.getElementById(`Al${NumOfSetsB}`);

            var RmBttn = document.getElementById(`${NumOfSetsB}`);

            Set.setAttribute("id", `S${Snum-1}`);

            Qinput.setAttribute("id", `Q${Snum-1}`);
            Qlabel.setAttribute("id", `Ql${Snum-1}`);
            Qlabel.setAttribute("for", `Q${Snum-1}`);

            Ainput.setAttribute("id", `A${Snum-1}`);
            Alabel.setAttribute("id", `Al${Snum-1}`);
            Alabel.setAttribute("for", `A${Snum-1}`);

            RmBttn.setAttribute("id", `${Snum-1}`);

            $(Qlabel).html(`Question ${Snum-1}`)
            $(Alabel).html(`Answer ${Snum-1}`)

            $(RmBttn).html(`remove question ${Snum-1}`)

            NumOfSetsA--;
            NumOfSetsB--;
            Snum--;
    }
    function logs(){
        console.log("Snum after changing set values: " + Snum);
        console.log("NumOfSetsAfter changing set values: " + NumOfSetsA);
        console.log("Snum after adding: " + (Snum));
    }

    var RmSet = document.getElementById(`S${id}`);

    var NumOfSetsB = document.querySelectorAll(".set").length;
    console.log("Num Of Sets Before removing: " + NumOfSetsB);
    console.log("id of deleted button: " + id);
    console.log("SnumBefore removing: " + Snum);
    if(NumOfSetsB==id){
        console.log("removed last set");
        isLast=1;
        isFirst=0;
        isOther = 0;
        Snum--;
    }else if(id==1){
        console.log("removed first set");
        isLast=0;
        isFirst=1;
        isOther = 0;
        Snum--;
    }else{
        console.log("removed other set")
        isLast=0;
        isFirst=0;
        isOther = 1;
        Snum--;
    }

    RmSet.remove();

    var NumOfSetsA = document.querySelectorAll(".set").length;
    console.log("NumOfSetsAfter removing: " + NumOfSetsA);
    console.log("Snum After removing: " + Snum);
    console.log("NumOfSetsB value: " + NumOfSetsB);
    console.log("isFirst value: " + isFirst);
    console.log("isLast value: " + isLast);
    console.log("isOther value: " + isOther);

    if(isFirst==1){
        while(NumOfSetsA>0){
            changeValues();
        }
        
        
        NumOfSetsA = document.querySelectorAll(".set").length;
        Snum += NumOfSetsA;
        logs();
        
    }else if(isOther==1){
        while(NumOfSetsA >= id){
            changeValues();
        }

        NumOfSetsA = document.querySelectorAll(".set").length;
        Snum += NumOfSetsA - id + 1;
        logs();
    }
}

function saveQuestions(){
        let passphrase = document.getElementById('secretfile-save-passphrase').value;
        let entries = document.getElementById('editor-entries');

          generateFileContent(entries, passphrase);
      }
      
      function generateFileContent(entries, passphrase) {
        try {
          let secretFileContent = `{
        "version": ${secretfileVersion},
        "encrypted": ${passphrase ? true : false},
        "entries": [`;
          entries.querySelectorAll(".secretfileEditorEntry").forEach((entry, i) => {
            secretFileContent += `
          {
            "entryId": ${i + 1},
            "accountName": "${passphrase ? encryptString(entry.querySelector(`#secretfileEditorEntry-accountName`).value, passphrase) : entry.querySelector(`#secretfileEditorEntry-accountName`).value}",
            "accountLogin": "${passphrase ? encryptString(entry.querySelector(`#secretfileEditorEntry-accountLogin`).value, passphrase) : entry.querySelector(`#secretfileEditorEntry-accountLogin`).value}",
            "otpSecret": "${passphrase ? encryptString(entry.querySelector(`#secretfileEditorEntry-otpSecret`).value, passphrase) : entry.querySelector(`#secretfileEditorEntry-otpSecret`).value}",
            "otpDigits": ${entry.querySelector(`#secretfileEditorEntry-otpDigits`).value},
            "otpTime": ${entry.querySelector(`#secretfileEditorEntry-otpTime`).value}
          }`;
            if (i !== entries.querySelectorAll(".secretfileEditorEntry").length - 1) {
              secretFileContent += `,`;
            }
          });
      
          secretFileContent += `
        ]
      }`;
          let filename = document.getElementById('filename').value;
          downloadFile(secretFileContent, `${filename}.secretfile.json`, 'application/json');
        } catch (e) {
          console.error('An error occured: ' + e);
        }
}

function downloadFile(data, filename, type) {
    let file = new Blob([data], {
      type: type
    });
    if (window.navigator.msSaveOrOpenBlob)
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      let a = document.createElement("a")
      let url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }