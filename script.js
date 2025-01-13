
  // Mélange aléatoire des cartes
  function shuffleCards() {
    const gallery = document.querySelector('.gallery');
    const cards = Array.from(gallery.children);
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    shuffledCards.forEach(card => gallery.appendChild(card)); // Ajoute les cartes mélangées
  }

  const cards = document.querySelectorAll('.card');
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  // Réinitialiser le jeu : toutes les cartes sont retournées
  function resetGame() {
    cards.forEach(card => {
      card.classList.remove('flipped', 'matched');
      card.querySelector('img').style.display = 'none';
      card.querySelector('.back').style.display = 'block';
    });
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    shuffleCards(); // Mélange les cartes à chaque nouvelle catégorie
  }

  // Fonction pour vérifier si le jeu est terminé
  function checkGameOver() {
    const matchedCards = document.querySelectorAll('.card.matched');
    // Si toutes les cartes ont été appariées, afficher le message "Bravo"
    if (matchedCards.length === cards.length) {
      // Déclenche un message "Bravo" après un court délai
      window.alert("Hello world!");
    }
    }


  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

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
        checkGameOver(); // Vérifie si le jeu est terminé après chaque paire correcte
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          firstCard.querySelector('img').style.display = 'none';
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

  // Filtre des catégories
  document.querySelectorAll('.category-filter').forEach(button => {
    button.addEventListener('click', (e) => {
      const category = e.target.getAttribute('data-category');
      const allCards = document.querySelectorAll('.card');
      
      // Réinitialiser le jeu avant de filtrer
      resetGame();

      // Afficher/masquer les cartes en fonction de la catégorie choisie
      allCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
          card.style.display = 'block'; // Affiche la carte
        } else {
          card.style.display = 'none'; // Cache la carte
        }
      });
    });
  });

  // Afficher toutes les photos
  document.getElementById('showAll').addEventListener('click', () => {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
      card.style.display = 'block'; // Affiche toutes les cartes
    });

    resetGame(); // Réinitialise le jeu après avoir montré toutes les cartes
  });

  // Mélange les cartes au chargement
  shuffleCards();
