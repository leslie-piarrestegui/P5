//************ INDEX ***********/
let articles = [];

const makeGetRequest = () => {
    /**
     * renvoyer une promise permet d'attendre la fin de l'execution de la requete,
     * de resolve le resultat si tout c'est bien passer 
     * ou de reject le code http de la reponse API
     */
    return new Promise((resolve, reject) => {
        console.log('-- faire la requete');

        const request = new XMLHttpRequest();
        console.log(request);

        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                listArticles = JSON.parse(this.responseText);

                console.log('l\'api a mis 0,5 secondes a nous repondre =>', listArticles);
                resolve(listArticles);
            } else if (this.status >= 400) {
                reject(this.status);
            }
        };

        request.open("GET", `http://localhost:3000/api/teddies`);
        request.send();
    });
};

/**
 * le mot cle 'async' dit a la fonction qu'elle est asynchrone.
 */
const getArticlesFromApi = async () => {
    /**
     * Le bloc try catch permet d'executer une fonction asyncrone
     * avec le mot cle await, et d'intercepter les erreurs.
     */
    try {
        console.log('- demamder les articles a l\'API');
        /**
         * le mot cle 'await' permet de faire apel à une fonction asyncrone et attendre le resultat.
         */
        return await makeGetRequest();
    } catch (err) {
        /**
         * si la fonction asyncrone reject une erreur, 
         * elle sera disponible dans la variable 'err'.
         */
        console.error(err);
    }
};

const getArticles = async (article) => {

    /**
     * essai d'executer getArticlesFromApi mais attend qu'elle soit terminer avant.
     * si c'est ok fait le et affiche le message dans la console
     * sinon affiche une erreur dans la console.
     */
    try {
        console.log(" 1) recuperation de la liste des articles");
        articles = await getArticlesFromApi();
        console.log(" 2) creer les articles");
    } catch (err) {
        console.log(err);
    }

    for (let i = 0; i < articles.length; i++) {
        functionQuiCreeLesCartesArticle(articles[i]);
    };
};

const functionQuiCreeLesCartesArticle = (article) => {
    console.log(articles);

    var carteArticle = document.createElement("div");
    carteArticle.className = 'card shadow col-md-4 m-3 p-3';

    var nomDeLarticle = createArticleName(article.name);
    carteArticle.appendChild(nomDeLarticle);

    var imageDeLarticle = createArticleImage(article.imageUrl);
    carteArticle.appendChild(imageDeLarticle);

    var descriptionDeLarticle = createArticleDescription(article.description);
    carteArticle.appendChild(descriptionDeLarticle);

    var quantiteDeLarticle = createArticlequantite(article.quantite);
    carteArticle.appendChild(quantiteDeLarticle);

    var prixDeLarticle = createArticlePrice(article.price);
    carteArticle.appendChild(prixDeLarticle);


    document.getElementById('carte').appendChild(carteArticle);
}

const createArticleName = (nomDeLarticle) => {
    var baliseParagraphe = document.createElement("P");
    baliseParagraphe.className = 'text-center m-0';
    var textbaliseParagraphe = document.createTextNode(nomDeLarticle);

    baliseParagraphe.appendChild(textbaliseParagraphe);

    return baliseParagraphe;
}

const createArticleDescription = (descriptionDeLarticle) => {
    var baliseParagraphe = document.createElement("P");
    baliseParagraphe.className = 'text-center mt-2';
    var textbaliseParagraphe = document.createTextNode(descriptionDeLarticle);

    baliseParagraphe.appendChild(textbaliseParagraphe);

    return baliseParagraphe;
}
const createArticlePrice = (prixDeLarticle) => {
    var baliseParagraphe = document.createElement("P");
    baliseParagraphe.className = 'text-center m-0';
    var textbaliseParagraphe = document.createTextNode('Prix : ' + prixDeLarticle + '$');

    baliseParagraphe.appendChild(textbaliseParagraphe);

    return baliseParagraphe;
}

const createArticleImage = (imageDeLarticle) => {
    var monImage = document.createElement('img');
    monImage.src = imageDeLarticle;
    monImage.style.width = "200px";
    monImage.className = 'm-auto';
    monImage.addEventListener('click', function () {
        window.location.href = 'article.html'
    });
    return monImage;
}

const createArticlequantite = (quantiteDeLarticle) => {
    var baliseParagraphe = document.createElement("P");
    baliseParagraphe.className = 'text-center m-0';
    var textbaliseParagraphe = document.createTextNode('quantite de l\'article : ' + quantiteDeLarticle);

    console.log(textbaliseParagraphe, quantiteDeLarticle);

    if (quantiteDeLarticle == 0) {
        baliseParagraphe.style.color = "red";
    } else {
        baliseParagraphe.style.color = "green";
    }

    baliseParagraphe.appendChild(textbaliseParagraphe);

    return baliseParagraphe;
}

getArticles();

//************************* FIN INDEX ********************/



