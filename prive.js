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
    return;
  }
  
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
    
    if (poster.comments.length > 0) {
      html += '<div class="comments-section">';
      poster.comments.forEach(c => {
        html += `<div class="comment"><strong>${c.rank}</strong> : ${c.comment}</div>`;
      });
      html += '</div>';
    }
    
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
      `;
      
      if (poster.comments.length > 0) {
        html += '<div class="comments-section">';
        poster.comments.forEach(c => {
          html += `<div class="comment"><strong>${c.rank}</strong> : ${c.comment}</div>`;
        });
        html += '</div>';
      }
      
      html += '</div>';
    }
    
    html += '</div></div>';
  }
  
  container.innerHTML = html;
}

// Charger les résultats de TSTMG2 par défaut au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  showResults('tstmg2');
});
