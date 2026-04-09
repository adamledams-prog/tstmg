let currentClass = 'tstmg2';

// Configuration des affiches pour chaque classe
const postersConfig = {
  tstmg2: [
    { id: 1, image: 'images_tstmg2/BEN AICHA_Lina_09-03.jpeg' },
    { id: 2, image: 'images_tstmg2/Diapositive1.JPG' },
    { id: 3, image: 'images_tstmg2/BENARD_Timothée_09-03.png' },
    { id: 4, image: 'images_tstmg2/BOUNOUA_Tiago Sofiene_09-03.pdf' },
    { id: 5, image: 'images_tstmg2/DE CROZANT DE BRIDIERS_Diana_09-03.jpeg' },
    { id: 6, image: 'images_tstmg2/ESSOURI_Lina_09-03.pdf' },
    { id: 7, image: 'images_tstmg2/GOUGOU_Clara_09-03.png' },
    { id: 8, image: 'images_tstmg2/HAMILA_Shahinez_11-03.pdf' },
    { id: 9, image: 'images_tstmg2/HUMBERTCLAUDE_Ethan_09-03.pdf' },
    { id: 10, image: 'images_tstmg2/LEULLIEUX_Romane_09-03.png' },
    { id: 11, image: 'images_tstmg2/MARIE_Sasha_09-03.png' },
    { id: 12, image: 'images_tstmg2/MARQUEZ_Lance_09-03.png' },
    { id: 13, image: 'images_tstmg2/MICHELIZZA-BACZEWSKA_Alexia_09-03.pdf' },
    { id: 14, image: null }, // MONLEON Liko (fichier Word)
    { id: 15, image: 'images_tstmg2/PULEO_Evan_09-03.png' },
    { id: 16, image: 'images_tstmg2/RAIMONDI_Kelian_09-03.pdf' },
    { id: 17, image: 'images_tstmg2/RAOUAFI_Nader_09-03.png' },
    { id: 18, image: 'images_tstmg2/RENNA_Massimo_09-03.pdf' },
    { id: 19, image: 'images_tstmg2/SISSOKO-BATICLE_Adriano_09-03.png' },
    { id: 20, image: 'images_tstmg2/SOLTANI_Aya_09-03.pdf' },
    { id: 21, image: 'images_tstmg2/TEMIRKHAEVA_Madina_09-03.pdf' },
    { id: 22, image: 'images_tstmg2/YIGIT_Kubra_09-03.pdf' }
  ],
  tstmg3: [
    { id: 1, image: 'imageststmg3/AIELLO_Johan_09-03.png' },
    { id: 2, image: 'imageststmg3/BEN ABDELMOULA_Amine_09-03.pdf' },
    { id: 3, image: 'imageststmg3/BEN HADJ SAAD_Arcelane_09-03.png' },
    { id: 4, image: 'imageststmg3/BERGACHI_Rania_09-03.pdf' },
    { id: 5, image: 'imageststmg3/BRAMKI_Rayyan_09-03.pdf' },
    { id: 6, image: 'imageststmg3/COUTELLIER_Ella_09-03.png' },
    { id: 7, image: 'imageststmg3/DARMON_Shanon_09-03.pdf' },
    { id: 8, image: 'imageststmg3/GERARD-BENHAIM_Sacha_09-03.png' },
    { id: 9, image: 'imageststmg3/GONZALEZ_Emma_09-03.png' },
    { id: 10, image: 'imageststmg3/HAMIDA_Rokaïa_09-03.pdf' },
    { id: 11, image: 'imageststmg3/HEDHILI_Lisa_09-03.png' },
    { id: 12, image: 'imageststmg3/HERMETZ-BOSCHER_Lorenzo_09-03.pdf' },
    { id: 13, image: 'imageststmg3/Image1.png' },
    { id: 14, image: 'imageststmg3/LANTOINE_Travis_09-03.png' },
    { id: 15, image: 'imageststmg3/LAYOUNI_Yacin_09-03.pdf' },
    { id: 16, image: 'imageststmg3/MABROUK_Selma_09-03.pdf' },
    { id: 17, image: 'imageststmg3/PIET_Virgile_09-03.jpeg' },
    { id: 18, image: 'imageststmg3/RAYMOND--MAÂOUI_Esteban_09-03.png' },
    { id: 19, image: 'imageststmg3/SEBA_Lila_09-03.png' },
    { id: 20, image: 'imageststmg3/TRAMICHEL--GARDEL_Jean_09-03.pdf' }
  ]
};

function collectVotes(classType) {
  const results = {};
  
  // Parcourir tous les votes dans localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('votes_')) {
      try {
        const voteData = JSON.parse(localStorage.getItem(key));
        const studentName = voteData.studentName;
        
        // Traiter chaque vote de cet élève
        Object.keys(voteData.votes).forEach(posterId => {
          const vote = voteData.votes[posterId];
          
          if (!results[posterId]) {
            results[posterId] = {
              id: posterId,
              votes: [],
              totalVotes: 0,
              points: 0,
              comments: []
            };
          }
          
          // Calculer les points (1er = 3 pts, 2ème = 2 pts, 3ème = 1 pt)
          let points = 0;
          if (vote.rank === '1er') points = 3;
          else if (vote.rank === '2ème') points = 2;
          else if (vote.rank === '3ème') points = 1;
          
          results[posterId].votes.push({
            student: studentName,
            rank: vote.rank,
            points: points,
            comment: vote.comment
          });
          results[posterId].totalVotes++;
          results[posterId].points += points;
          
          if (vote.comment) {
            results[posterId].comments.push({
              student: studentName,
              rank: vote.rank,
              comment: vote.comment
            });
          }
        });
      } catch (e) {
        console.error('Erreur de parsing:', e);
      }
    }
  }
  
  return results;
}

function renderPosterImage(poster) {
  if (!poster.image) {
    return '<div style="display:flex;align-items:center;justify-content:center;height:200px;background:#f3f4f6;color:#6b7280;border-radius:8px;margin-bottom:15px;font-size:18px;">📄 Affiche ' + poster.id + '</div>';
  }
  
  if (poster.image.endsWith('.pdf')) {
    return '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;border-radius:8px;margin-bottom:15px;"><div style="font-size:48px;margin-bottom:10px;">📄</div><div style="font-size:14px;font-weight:600;">Affiche PDF #' + poster.id + '</div></div>';
  } else {
    return '<img src="' + poster.image + '" class="poster-preview" alt="Affiche ' + poster.id + '">';
  }
}

function showResults(classType) {
  currentClass = classType;
  
  // Mettre à jour les boutons
  document.querySelectorAll('.class-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase().includes(classType)) {
      btn.classList.add('active');
    }
  });
  
  const votes = collectVotes(classType);
  const posters = postersConfig[classType];
  
  // Convertir en tableau et trier par points (puis par nombre de votes)
  let sortedPosters = Object.keys(votes).map(id => ({
    ...votes[id],
    posterInfo: posters.find(p => p.id == id)
  }));
  
  // Trier par points décroissants
  sortedPosters.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    // En cas d'égalité, ordre aléatoire
    return Math.random() - 0.5;
  });
  
  const container = document.getElementById('resultsContainer');
  
  if (sortedPosters.length === 0) {
    container.innerHTML = '<div class="no-votes">Aucun vote pour le moment</div>';
    displayComments([]);
    return;
  }
  
  // Afficher les commentaires
  displayComments(sortedPosters);
  
  // Top 3
  let html = '<div class="podium-container">';
  
  const podiumClasses = ['first', 'second', 'third'];
  const medals = ['🥇', '🥈', '🥉'];
  
  for (let i = 0; i < Math.min(3, sortedPosters.length); i++) {
    const poster = sortedPosters[i];
    const posterInfo = poster.posterInfo;
    
    html += `
      <div class="podium-item ${podiumClasses[i]}">
        <div class="medal">${medals[i]}</div>
        ${posterInfo ? renderPosterImage(posterInfo) : ''}
        <div class="poster-number">Affiche #${poster.id}</div>
        <div class="points-badge">${poster.points} points</div>
        <div class="vote-count">${poster.totalVotes} vote(s)</div>
    `;
    
    html += '</div>';
  }
  
  html += '</div>';
  
  // Le reste des affiches
  if (sortedPosters.length > 3) {
    html += '<div class="rest-container">';
    html += '<div class="rest-title">Autres affiches</div>';
    html += '<div class="rest-grid">';
    
    for (let i = 3; i < sortedPosters.length; i++) {
      const poster = sortedPosters[i];
      const posterInfo = poster.posterInfo;
      const delay = (i - 3) * 0.1;
      
      html += `
        <div class="rest-item" style="animation-delay: ${delay}s">
          ${posterInfo && posterInfo.image ? (posterInfo.image.endsWith('.pdf') 
            ? '<div style="width:100%;height:180px;display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#6b7280;border-radius:6px;margin-bottom:10px;">📄 PDF</div>'
            : '<img src="' + posterInfo.image + '" class="rest-poster" alt="Affiche">'
          ) : '<div style="width:100%;height:180px;display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#6b7280;border-radius:6px;margin-bottom:10px;">📄</div>'}
          <div class="rest-number">Affiche #${poster.id}</div>
          <div class="points-badge">${poster.points} points</div>
          <div class="vote-count">${poster.totalVotes} vote(s)</div>
        </div>
      `;
    }
    
    html += '</div></div>';
  }
  
  container.innerHTML = html;
  
  // Lancer les confettis après l'animation du podium (2.2 secondes)
  setTimeout(() => {
    launchConfetti();
  }, 2200);
  
  // Le robot analyse et commente les résultats
  setTimeout(() => {
    const message = analyzeResults(sortedPosters);
    showRobotMessage(message.emoji, message.text);
  }, 3500);
  
  // Mettre à jour le taux de participation
  updateParticipationRate(sortedPosters, classType);
}

function displayComments(sortedPosters) {
  const commentsDisplay = document.getElementById('commentsDisplay');
  
  if (!sortedPosters || sortedPosters.length === 0) {
    commentsDisplay.innerHTML = '<p style="color:#6b7280;font-size:13px;">Aucun commentaire pour le moment</p>';
    return;
  }
  
  let commentsHTML = '';
  
  // Récupérer tous les commentaires du top 3
  for (let i = 0; i < Math.min(3, sortedPosters.length); i++) {
    const poster = sortedPosters[i];
    
    if (poster.comments && poster.comments.length > 0) {
      poster.comments.forEach((commentObj, idx) => {
        commentsHTML += `
          <div class="comment-item" style="animation-delay: ${i * 0.1 + idx * 0.05}s">
            <span class="rank-badge">Affiche #${poster.id} - ${commentObj.rank}</span>
            <div class="comment-text">"${commentObj.comment}"</div>
            <div class="comment-author">— ${commentObj.student}</div>
          </div>
        `;
      });
    }
  }
  
  if (commentsHTML === '') {
    commentsDisplay.innerHTML = '<p style="color:#6b7280;font-size:13px;">Aucun commentaire laissé</p>';
  } else {
    commentsDisplay.innerHTML = commentsHTML;
  }
}

function launchConfetti() {
  // Confettis depuis la gauche
  confetti({
    particleCount: 100,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.6 },
    colors: ['#fbbf24', '#f59e0b', '#d97706', '#b45309']
  });
  
  // Confettis depuis la droite
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af']
    });
  }, 200);
  
  // Confettis depuis le centre
  setTimeout(() => {
    confetti({
      particleCount: 150,
      angle: 90,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b']
    });
  }, 400);
  
  // Scroll automatique vers les autres affiches après les confettis
  setTimeout(() => {
    const restContainer = document.querySelector('.rest-container');
    if (restContainer) {
      // Ajouter une classe pour déclencher l'animation
      restContainer.classList.add('revealing');
      
      // Scroll fluide vers les autres affiches
      restContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Déclencher l'animation de révélation des items
      setTimeout(() => {
        const restItems = document.querySelectorAll('.rest-item');
        restItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('revealed');
          }, index * 100);
        });
      }, 500);
    }
  }, 1500);
}

// Charger les résultats de TSTMG2 par défaut au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  showResults('tstmg2');
  
  // Gérer l'affichage du bouton retour en haut
  window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
});

// Fonction pour remonter en haut
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Fonction pour mettre à jour le taux de participation
function updateParticipationRate(sortedPosters, classType) {
  const totalStudents = {
    'tstmg2': 23,
    'tstmg3': 24
  };
  
  const totalForClass = totalStudents[classType];
  
  // Compter les élèves uniques qui ont voté
  const uniqueVoters = new Set();
  sortedPosters.forEach(poster => {
    if (poster.votes) {
      poster.votes.forEach(vote => {
        uniqueVoters.add(vote.student);
      });
    }
  });
  
  const votersCount = uniqueVoters.size;
  const percentage = totalForClass > 0 ? Math.round((votersCount / totalForClass) * 100) : 0;
  
  // Mettre à jour l'affichage
  const percentElement = document.getElementById('participationPercent');
  const detailsElement = document.getElementById('participationDetails');
  const progressRing = document.getElementById('progressRing');
  
  // Animation du pourcentage
  let currentPercent = 0;
  const interval = setInterval(() => {
    if (currentPercent >= percentage) {
      clearInterval(interval);
      percentElement.textContent = percentage + '%';
    } else {
      currentPercent++;
      percentElement.textContent = currentPercent + '%';
    }
  }, 20);
  
  // Mettre à jour les détails
  detailsElement.textContent = `${votersCount}/${totalForClass} élèves`;
  
  // Animer le cercle de progression
  const circumference = 2 * Math.PI * 45; // rayon = 45
  const offset = circumference - (percentage / 100) * circumference;
  progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
  progressRing.style.strokeDashoffset = circumference;
  
  setTimeout(() => {
    progressRing.style.strokeDashoffset = offset;
  }, 100);
  
  // Changer la couleur selon le taux de participation
  const indicator = document.getElementById('participationIndicator');
  indicator.classList.remove('low', 'medium', 'high');
  if (percentage < 40) {
    indicator.classList.add('low');
  } else if (percentage < 70) {
    indicator.classList.add('medium');
  } else {
    indicator.classList.add('high');
  }
}

// Gestion du robot assistant
let robotMessageTimeout;

function analyzeResults(sortedPosters) {
  if (!sortedPosters || sortedPosters.length === 0) {
    return { emoji: '🤷', text: 'Aucun vote pour le moment ! Patience, ça arrive...' };
  }
  
  const totalVotes = sortedPosters.reduce((sum, p) => sum + p.totalVotes, 0);
  const totalPosters = sortedPosters.length;
  
  // Vérifier s'il y a des égalités dans le top 3
  if (sortedPosters.length >= 2) {
    // Égalité pour la 1ère place
    if (sortedPosters[0].points === sortedPosters[1].points) {
      return { 
        emoji: '😱', 
        text: 'Ah ! Il y a une égalité parfaite pour la 1ère place ! C\'est incroyable... Chance ou malchance ? 🎲'
      };
    }
    
    // Égalité pour la 2ème place
    if (sortedPosters.length >= 3 && sortedPosters[1].points === sortedPosters[2].points) {
      return { 
        emoji: '🤔', 
        text: 'Égalité pour la 2ème place ! La compétition est serrée ! 🔥'
      };
    }
  }
  
  // Victoire écrasante
  if (sortedPosters.length >= 2) {
    const firstPoints = sortedPosters[0].points;
    const secondPoints = sortedPosters[1].points;
    const diff = firstPoints - secondPoints;
    
    if (diff >= 10) {
      return { 
        emoji: '🚀', 
        text: `Victoire écrasante ! ${diff} points d'avance, c'est du lourd ! 💪`
      };
    }
    
    if (diff === 1) {
      return { 
        emoji: '😅', 
        text: 'C\'est serré ! Seulement 1 point d\'écart... Suspense total ! ⚡'
      };
    }
  }
  
  // Taux de participation
  const uniqueVoters = new Set();
  sortedPosters.forEach(p => {
    p.votes.forEach(v => uniqueVoters.add(v.student));
  });
  const votersCount = uniqueVoters.size;
  
  if (votersCount >= 20) {
    return { 
      emoji: '🎉', 
      text: `Super participation ! ${votersCount} élèves ont voté ! Bravo à tous ! 👏`
    };
  }
  
  if (votersCount <= 5 && votersCount > 0) {
    return { 
      emoji: '📢', 
      text: `Seulement ${votersCount} votes... On attend les autres ! Allez, votez ! 🗳️`
    };
  }
  
  // Beaucoup de commentaires
  const totalComments = sortedPosters.reduce((sum, p) => 
    sum + (p.comments ? p.comments.length : 0), 0
  );
  
  if (totalComments >= 15) {
    return { 
      emoji: '💬', 
      text: `Wow ! ${totalComments} commentaires laissés ! Les élèves sont inspirés ! ✨`
    };
  }
  
  // Affiche avec beaucoup de votes
  if (sortedPosters[0].totalVotes >= 15) {
    return { 
      emoji: '⭐', 
      text: `L'affiche #${sortedPosters[0].id} cartonne avec ${sortedPosters[0].totalVotes} votes ! 🌟`
    };
  }
  
  // Découverte d'un trio
  if (sortedPosters.length >= 3) {
    const top3Points = sortedPosters.slice(0, 3).reduce((sum, p) => sum + p.points, 0);
    const totalPoints = sortedPosters.reduce((sum, p) => sum + p.points, 0);
    const percentage = (top3Points / totalPoints * 100).toFixed(0);
    
    if (percentage >= 70) {
      return { 
        emoji: '👑', 
        text: `Le top 3 domine avec ${percentage}% des points ! Triple couronne ! 👑👑👑`
      };
    }
  }
  
  // Messages généraux positifs
  const positiveMessages = [
    { emoji: '🎨', text: 'De superbes affiches ! Le talent est au rendez-vous ! 🖌️' },
    { emoji: '🏆', text: 'La compétition fait rage ! Que le meilleur gagne ! 💫' },
    { emoji: '✨', text: 'Chaque vote compte ! Merci à tous les participants ! 🙏' },
    { emoji: '🌈', text: 'La créativité est au rendez-vous ! C\'est magnifique ! 🎭' },
    { emoji: '🎯', text: 'Les résultats évoluent ! Restez connectés ! 📊' }
  ];
  
  return positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
}

function showRobotMessage(emoji, text) {
  const robotMessage = document.getElementById('robotMessage');
  const messageText = robotMessage.querySelector('.robot-message-text');
  const robotBody = document.querySelector('.robot-body');
  
  messageText.innerHTML = `<span class="robot-message-emoji">${emoji}</span>${text}`;
  robotMessage.classList.add('show');
  
  // Changer l'expression du robot selon l'emoji
  robotBody.classList.remove('happy', 'sad', 'excited', 'thinking');
  if (['🎉', '🚀', '⭐', '👑'].includes(emoji)) {
    robotBody.classList.add('excited');
  } else if (['😱', '😅', '🤔'].includes(emoji)) {
    robotBody.classList.add('thinking');
  } else if (['🤷', '📢'].includes(emoji)) {
    robotBody.classList.add('sad');
  } else {
    robotBody.classList.add('happy');
  }
  
  // Cacher après 8 secondes
  clearTimeout(robotMessageTimeout);
  robotMessageTimeout = setTimeout(() => {
    robotMessage.classList.remove('show');
    robotBody.classList.remove('happy', 'sad', 'excited', 'thinking');
  }, 8000);
}

function toggleRobotMessage() {
  const robotMessage = document.getElementById('robotMessage');
  if (robotMessage.classList.contains('show')) {
    robotMessage.classList.remove('show');
  } else {
    // Réanalyser les résultats actuels
    const votes = collectVotes(currentClass);
    const posters = postersConfig[currentClass];
    let sortedPosters = Object.keys(votes).map(id => ({
      ...votes[id],
      posterInfo: posters.find(p => p.id == id)
    }));
    sortedPosters.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return Math.random() - 0.5;
    });
    
    const message = analyzeResults(sortedPosters);
    showRobotMessage(message.emoji, message.text);
  }
}

function hideRobotMessage() {
  const robotMessage = document.getElementById('robotMessage');
  robotMessage.classList.remove('show');
  clearTimeout(robotMessageTimeout);
}
