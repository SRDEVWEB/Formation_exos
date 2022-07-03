//Déclarations des variables et constantes globales
    let j=0; //Nb de vêtements retiré [utilisée dans plusieurs fonctions ayant déjà des return... Pas réussit à return plusieurs valeurs --> Possible?]
                                                                                                                                            let array = ['texas', 'texmex', 'gore tex','textile', 'latex', 'texte','texto', 'semtex', 'cortex', 'pattex', 'texaco', 'tex avery', 'le texier', 'alexis texas', 'tex'];
     //Liste des mots à trouver sera déplacé dans BD
    let nb_mots=array.length; //Nombre de mots à trouver dans la liste du tableau
    var nomgamer;//[utilisée dans plusieurs fonctions]. Inconnu au début (quoi que 'Votre nom' est inscrit dès le début!)... Donc var, Sera remplacé lors de la création du compte utilisateur!
    const departMinutes = 3.5; //Temps alloué au joueur pour trouver les mots de la liste
    let scoretime=0; //Bonus/malus temps

//Page des régles
function régles()
{
    //console.log(nomgamer);
    nomgamer=document.getElementById('Nom_Joueur').value;

    let text_accueil = 
        "<nav class='rules'><p>\
        <div>Sébastien et Rémy ont l'honneur de vous présenter un jeu style ''pendu'' !</div>\
        <div>Vous devrez effectivement trouver et écrire des mots afin d'éviter de dénuder votre avatar !</div>\
        <div>Mais puisque nous sommes quand même sympa, et qu'on veux vous laisser un chance, nous vous donnons quelques\
         régles a respecter pour avoir une chance de gagner !</div>\
        </p>\
        </nav>\
        <nav class='rules'>\
        <h1>Les régles</h1>\
        <ul class='listrules'>\
            <li>✅ - Vous avez " + nb_mots + " mots à trouver en " + parseInt(departMinutes*60) + " secondes,</li>\
            <li>✅ - Tout mot recherché devra contenir les lettres TEX!</li>\
            <li>✅ - Ecrivez tout en minuscule et sans accents,</li>\
            <li>✅ - Vous avez le droit à 5 erreurs avant que, votre avatar vous le fasse payer!</li>\
            <li>✅ - Vous serez chronometré et classé suivant votre vitesse.</li>\
        </ul>\
        </nav>\
        <br><div id='centrage_dém'><input id='Démarrer' type='button' value='CONTINUER' onclick='rempliravatar()'\
         style='cursor: pointer;'></div></div></br>\
        ";
        //Ajoute le texte ci-dessus dans index.html à l'emplacement 'divtochangetop'
    let div_a_changer = document.getElementById('divtochangetop');
    div_a_changer.innerHTML = text_accueil;
        //Ajoute le texte ci-dessous dans index.html à l'emplacement 'bienvenue'
    let div_a_écrire = document.getElementById('bienvenue');
    div_a_écrire.innerHTML = "Bonjour et bienvenue,";
}

//Définition du sexe de l'avatar
function rempliravatar()
{
    let div_a_écrire = document.getElementById('bienvenue');
    div_a_écrire.innerHTML = "Encore quelques infos...";

    let text_accueil = 
        "<br>\
        <fieldset>\
        <legend>Sélectionner le sexe de votre avatar</legend>\
        <div>\
        <input type='radio' id='female' name='sex' value='Female'>\
        <label for='female'>Feminin</label>\
        </div>\
        <div>\
        <input type='radio' id='male' name='sex' value='Male'>\
        <label for='male'>Masculin</label>\
        </div>\
        </fieldset>\
        <br><div id='centrage_dém'>\
        <input id='Démarrer' type='button' value='JOUER' onclick='avatar(afficherAccueil())' style='cursor: pointer;'>\
        </div></div></br>\
        ";
    let div_a_changer = document.getElementById('divtochangetop');
    div_a_changer.innerHTML = text_accueil;
}

//Début du jeu
function afficherAccueil()
{
    let div_a_lire = document.getElementById('bienvenue');
    div_a_lire.innerHTML = "Et c'est parti, à toi de jouer!";

    nomgamer=document.getElementById('Nom_Joueur').value;

    //Retourne la valeur du bouton radio sexe avatar choisi
    let sexgamer= document.querySelector('input[name="sex"]:checked').value;
    if(sexgamer !== null && sexgamer !== ''){
    
    let text_accueil = 
        "<div id='middle1_contenant'>\
        <div id='tex_tex'><h2>TEX</h2></div>\
        <div id='indice_chrono_position'>\
        <div id='chrono'><div id='timer'></div></div>\
        </div>\
        <div id='cadre_validation'>\
        <input type='text' id='input_pre'autocomplete='off'></div>\
        <div id='avatar_1'>\
        </div>\
        <br>\
        <p id='txt_score'>Score: </p>\
        <input type='number' id='input_score' value=0 readonly=true></div>\
        </div>\
        ";
    let div_a_changer = document.getElementById('divtochangetop');
    div_a_changer.innerHTML = text_accueil;

    //L'appui sur la touche entrée après la saisie d'un mot lance la boucle sur les mots à trouver
    const input=document.getElementById('input_pre');
    input.addEventListener('keyup', (e)=>{if(e.keyCode===13){testboucle();}});

    document.getElementById('input_pre').focus();
    chrono();
    return sexgamer;
    }
}

//Affichage de l'avatar en fonction du sexe choisi dans le profil
function avatar(sex)
{
let sexeavatar=document.getElementById('avatar_1');
//console.log(sex);
        switch (sex)
        {
        case 'Female':
            sexeavatar.innerHTML=
                "<div class='avatarF' id='avatarF'></div>\
                <div class='jeanF' id='jeanF'></div>\
                <div class='vesteF' id='vesteF'></div>\
                <div class='tshirtF' id='tshirtF'></div>\
                <div class='chapeauF' id='chapeauF'></div>\
                <div class='fouetF' id='fouetF'></div>\
                ";
            break;
        case 'Male':
            sexeavatar.innerHTML=
                "<div class='avatarH' id='avatarH'></div>\
                <div class='chapeauH' id='chapeauH'></div>\
                <div class='jeanH' id='jeanH'></div>\
                <div class='vesteH' id='vesteH'></div>\
                <div class='tshirtH' id='tshirtH'></div>\
                <div class='fouetH' id='fouetH'></div>\
                ";
            break;
        }
}

//Temps de jeu
let scoretime_init=0;//???[utilisée dans 2 fonctions]. Inconnu au début??? A regarder de plus près!
function chrono()
{
    let temps = departMinutes * 60
    scoretime_init=departMinutes * 60
    const timerElement = document.getElementById("timer")
  
    var x=setInterval(function()
        {
        let minutes = parseInt(temps / 60, 10)
        let secondes = parseInt(temps % 60, 10)
        minutes = minutes < 10 ? "0" + minutes : minutes
        secondes = secondes < 10 ? "0" + secondes : secondes
        timerElement.innerText = `${minutes}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
        scoretime=temps;

                if ((minutes == 0)&&(secondes == 0)) 
                {
                    clearInterval(x);
                    document.getElementById("But_Recommence").innerHTML = "Temps imparti écoulé!";
                    //console.log('Temps écoulé');
                    finpartie();//Fin de partie 3/3
                }
        }, 1000)
    return scoretime;
}

//On retire les vêtements ici si mot proposé n'est pas dans la liste
function testboucle()
{
  var scorum = document.getElementById('input_score').value;
  let homme = document.getElementById('avatar_1');
  let hommeliste = homme.getElementsByTagName('div');
  var el = document.getElementById('input_pre').value; //Elément à rechercher
  let flag = 0;  // Initialement 0 - Introuvable
  
  for(let i2=0; i2<array.length; i2++)
    {
        if(el === array[i2])
        {
           flag = 1;
           array.splice(i2, 1);
           //console.log(array);
        }
    }
  
  //Vérifier si la valeur du drapeau a changé.
  if(flag == 1 && el!=='')
  {
     //console.log('mot trouvé');
     document.getElementById('input_pre').value='';
     j=0;
     //alert('What a F... winner!')
     //console.log(scorum);
     document.getElementById('input_score').value= ++scorum;
     
     //Fin de partie 1/3 - GAGNE, tous les mots ont été trouvés
     if(array.length<1){console.log(scoretime);
        document.getElementById('input_score').value=(parseInt(scorum) + parseInt(scoretime));
       
        document.getElementById("But_Recommence").innerHTML = "<input type='button' id='but_Reload' value='Recommencer'\
         onclick='recharger()' style='cursor: pointer;'>";
        document.getElementById("But_TabScore").innerHTML = "<input type='button' id='but_Tab_Scores' value='Tableau des scores'\
         onclick='tableauscores()' style='cursor: pointer;'>";

     sup_pre()
     let div_a_lire = document.getElementById('bienvenue');
     //Calcul du score...
     div_a_lire.innerHTML ='Gagné, la partie est terminée, vous avez un score de: ' + (parseInt(scorum) + parseInt(scoretime));
     }
  }
  else if(el!=='')
  { 
     //console.log(parseInt(scoretime_init));
     document.getElementById('input_pre').value='';
     j= ++j;
     //Fin de partie 2/3 - PERDU sur plus de vêtement
     if(j>0 && j<=4){hommeliste[j].style.display = 'none';//Retirer les vêtements
    }else if(j=5)//Fouet visible et donc perdu
     {
        //Calcul du score...
        hommeliste[j].style.display = 'block';document.getElementById('input_score').value=parseInt((parseInt(scorum) - (scoretime_init - parseInt(scoretime))));
        
        document.getElementById("But_Recommence").innerHTML = "<input type='button' id='but_Reload' value='Recommencer'\
         onclick='recharger()' style='cursor: pointer;'>";
        document.getElementById("But_TabScore").innerHTML = "<input type='button' id='but_Tab_Scores' value='Tableau des scores'\
         onclick='tableauscores()' style='cursor: pointer;'>";

        sup_pre();
        let div_a_lire = document.getElementById('bienvenue');
        //Calcul du score...
        div_a_lire.innerHTML = "Perdu, la partie est terminée, vous avez un score de: " + parseInt(parseInt(scorum) - (scoretime_init - parseInt(scoretime)));
    }
     if(j>=5){j=0;//Remise à zero de la variable [pas indispensable puisque le garbage fera le taf au moment du reload()]
    }
  }
}

//Fin de partie 3/3
function finpartie()
{
     //"Perdu, la partie est terminée sur temps écoulé, vous avez un score de: "
    var scorum = document.getElementById('input_score').value;
    document.getElementById('input_score').value=parseInt(scorum);  
    
    document.getElementById("But_Recommence").innerHTML = "<input type='button' id='but_Reload' value='Recommencer'\
     onclick='recharger()' style='cursor: pointer;'>";
    document.getElementById("But_TabScore").innerHTML = "<input type='button' id='but_Tab_Scores' value='Tableau des scores'\
     onclick='tableauscores()' style='cursor: pointer;'>";

    sup_pre();
    let div_a_lire = document.getElementById('bienvenue');
    //Calcul du score...
    div_a_lire.innerHTML = "Perdu, la partie est terminée, vous avez un score de: " + scorum;
}

//Recharger la page pour rejouer ou regarder une video pour nous soutenir
function recharger()
{
    if (confirm("Pour nous soutenir, regardez une vidéo en cliquant sur 'OK'!"))//confirm à la place de alert, pour avoir le bouton annuler
    {
        videosoutient();
    } 
    else
    {
        location.reload();
    }
}

//Affichage de la video de soutiens
function videosoutient()
{
    let div_a_changer = document.getElementById('divtochangetop');
    div_a_changer.innerHTML = "\
    <iframe width='785' height='477' src='https://www.youtube.com/embed/Y-kXtWdjtmw' title='Learn Latex in 5 minutes'\
     frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'\
      allowfullscreen></iframe>";
}

//Afficher/Masquer boutons utiles ou inutiles en fin de partie
function sup_pre()
{
    document.getElementById('input_pre').style.display="none";
    document.getElementById('indice_chrono_position').style.display="none";
}

//Ouverture des CGU
function cgu()
{
    let div_a_changer = document.getElementById('divtochangebottom');
    div_a_changer.innerHTML = document.getElementById('divtochangebottom').style.display='block';
    div_a_changer.innerHTML ="<h1 id='h1_bottom'>Les conditions générales d'utilisation...</h1>\
    <p id='p_bottom'>\
    <br>Les 11 articles des CGU, sont disponibles via le lien vers le fichier <a href='media/CGU_220622_Adam_Dev.pdf'\
     download='CGU_Adam_Dev' target='_blank'>CGU_220622_Adam_Dev.pdf</a>\
    </p><br><br>\
    <div onclick='closetoclose()' style='cursor: pointer;'><ion-icon name='close-circle' class='bottom_icon'></ion-icon></a></div>";
    goto();
}

//Ouverture des A PROPOS
function apropos()
{
    let div_a_changer = document.getElementById('divtochangebottom');
    div_a_changer.innerHTML = document.getElementById('divtochangebottom').style.display='block';
    div_a_changer.innerHTML ="<h1 id='h1_bottom'>A propos...</h1>\
    <p id='p_bottom'><br>The La...Tex...Game est un jeu du pendu autour du mot Tex.<br><br>Ce jeu a été développé\
     dans le cadre d'un exercice de collabaration de deux Dev. web en formation.\
    </p><br><br>\
    <div onclick='closetoclose()' style='cursor: pointer;'><ion-icon name='close-circle' class='bottom_icon'></ion-icon></div>";
    goto();
}

//Ouverture des infos sur ADAM & DEV
function adamdev()
{
    let div_a_changer = document.getElementById('divtochangebottom');
    div_a_changer.innerHTML = document.getElementById('divtochangebottom').style.display='block';
    div_a_changer.innerHTML ="<h1 id='h1_bottom'>ADAM & DEV, l'histoire d'une genése.</h1>\
    <p id='p_bottom'><br>Rémy et Sébastien, ou l'association du fût et de la bierre...<br><br>Pour votre plus grand\
     plaisir et le notre, <br>nous étudions toutes les demandes de réalisation de sites internet!<br></p><br><p>\
     Même ceux des plus fous... comme nous.</p><br><br>\
    <div onclick='closetoclose()' style='cursor: pointer;'><ion-icon name='close-circle' class='bottom_icon'></ion-icon></div>";
    goto();
}

//Ouverture des infos plan du site
function plansite()
{
    let div_a_changer = document.getElementById('divtochangebottom');
    div_a_changer.innerHTML = document.getElementById('divtochangebottom').style.display='block';
    div_a_changer.innerHTML ="<h1 id='h1_bottom'>Plan du site...</h1>\
    <p id='p_bottom'><br><ul class='ul_bottom'><li><div onclick='régles()' style='cursor: pointer;'>Accueil du jeu</div></li><li><div onclick='cgu()' style='cursor: pointer;'>CGU</div></li><li><div onclick='apropos()' style='cursor: pointer;'>A propos</div></li><li><div onclick='adamdev()' style='cursor: pointer;'>Adam & Dev</div></li><li><div onclick='plansite()' style='cursor: pointer;'>Plan\
     du site</div></li><li><div onclick='tableauscores()' style='cursor: pointer;'>Tableau des scores<div></li></ul></p><br><br>\
    <div onclick='closetoclose()' style='cursor: pointer;'><ion-icon name='close-circle' class='bottom_icon'></ion-icon></div>";
    goto();
}

//Clique sur la case input Nom du joueur pour sélectionner directement le nom afin de l'écraser
function selectText()
{
    const input = document.getElementById('Nom_Joueur');
    input.focus();
    input.select();
}

//Fermeture de la partie infos (CGU, A propos, plan site....)
function closetoclose()
{
    document.getElementById('divtochangebottom').style.display='none';
}

//Ancre bas de page pour suivre l'ouverture de la partie infos (CGU, A propos, plan site....)
function goto()
{
    const element = document.querySelector('#powered')
    const rect = element.getBoundingClientRect()
    window.scroll({top: rect.top,behavior: 'smooth'});
}

//---------------------------------------------------
//Affichage de la page des scores en travaux sans PHP <------------------- PHP à mettre en place
function tableauscores()
{
    let div_a_lire = document.getElementById('bienvenue');
    div_a_lire.innerHTML = "El Palmarès";
    nomgamer=document.getElementById('Nom_Joueur').value;
    
    let text_accueil = 
        "<p id='id_worksite'><ion-icon name='code-working-outline'></ion-icon><br><br>On apprend le PHP,<br>et on\
         reviens ''très vite'' pour réaliser cette page.<br><br><ion-icon name='code-working-outline'></ion-icon></p>\
        <br><div id='Back_accueil' onclick='régles()' style='cursor: pointer;'>Accueil</div>\
        ";
    let div_a_changer = document.getElementById('divtochangetop');
    div_a_changer.innerHTML = text_accueil;
    document.getElementById('But_TabScore').style.display="none";
}

//PHP à mettre en place,
    //Mettre en place un compte utilisateur,
            //Modifier CGU après mise en place d'un compte utilisateur,
    //Mettre en place le tableau des scores,
//BD/?SQL à mettre en place,
    //Table compte utilisateur, Table scores, ?Table Mots à trouver?,...
    //?Déplacer la liste des mots dans la BD?,
            //Trouver comment corriger la boucle sur les vêtements déjà retirés, suite à un mot trouvé...
                          //(++kk à chaque boucle i, et si i>0 alors boucle sur kk)
                          //ou plus simple, rhabiller l'avatar à chaque mot trouvé [Modifier les régles]
//Trouver d'autres mot contenant TEX,
//Mettre en place, l'échelle du Jean-Christophe Le Texier!
//Ajouter des niveaux de difficulté + permettre au joueur de modifier le temps de jeu,
//Trouver d'autres idées à mettre en place,
//Limite d'age pour jouer!

