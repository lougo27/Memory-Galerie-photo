
 function shuffleCards() { //Mélanger les cartes (j'essaye de faire programme en anglais)
    const gallery = document.querySelector('.gallery');
    const cards = Array.from(gallery.children);
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    shuffledCards.forEach(card => gallery.appendChild(card));
}

  const cards = document.querySelectorAll('.card');
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  
function resetGame() {
    cards.forEach(card => {
      card.classList.remove('flipped', 'matched');
      card.querySelector('img').style.display = 'none';
      card.querySelector('.back').style.display = 'block';
    });
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    shuffleCards(); 
  }

 
function checkGameOver() { //Petite fonction chat GPT (mais elle marche pas)
    const matchedCards = document.querySelectorAll('.card.matched');
    if (matchedCards.length === cards.length) {
      window.alert("C'est gagné");
    }
    }


  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (lockBoard || card === firstCard || card.classList.contains('matched')) return;
      //surement la ligne la plus compliquer à trouver
      card.classList.add('flipped');
      card.querySelector('img').style.display = 'block';
      card.querySelector('.back').style.display = 'none';

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;

      if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
        checkGameOver(); 
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          firstCard.querySelector('img').style.display = 'none'; //modifs css
          firstCard.querySelector('.back').style.display = 'block';
          secondCard.querySelector('img').style.display = 'none';
          secondCard.querySelector('.back').style.display = 'block';
          resetBoard();
        }, 1000);
      }
    });
  });

  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }


  document.querySelectorAll('.category-filter').forEach(button => { //fonction pour les filtres
    button.addEventListener('click', (e) => {
      const category = e.target.getAttribute('data-category');
      const allCards = document.querySelectorAll('.card');
      
      
      resetGame(); //Recommencer jeu quand on clique

      
      allCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
          card.style.display = 'block'; 
        } else {
          card.style.display = 'none'; 
        }
      });
    });
  });

  document.getElementById('showAll').addEventListener('click', () => { //Filtre "montrer tout"
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
      card.style.display = 'block'; 
    });

    resetGame(); //Recommencer jeu quand on clique
  });

  shuffleCards();
