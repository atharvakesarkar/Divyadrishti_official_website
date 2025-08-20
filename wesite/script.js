// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Comment form submission
document.getElementById('commentForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('commentName').value.trim();
    const email = document.getElementById('commentEmail').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const message = document.getElementById('commentMessage').value.trim();

    // Validate inputs
    if (!name || !rating || !message) {
        alert('Please fill out all required fields.');
        return;
    }

    const commentData = {
        name,
        email,
        rating: parseInt(rating, 10),
        message,
    };

    addCommentToUI(commentData);
    updateAverageRating();
    clearForm();
});

// Add comment to UI
const addCommentToUI = (data) => {
    const commentsContainer = document.getElementById('commentsList');
    const noCommentsMessage = document.getElementById('noCommentsMessage');

    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <div class="comment-header">
            <strong>${data.name}</strong>
            <span class="stars">${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</span>
        </div>
        <p class="comment-message">${data.message}</p>
        ${data.email ? `<p class="comment-email">Email: ${data.email}</p>` : ''}
    `;

    commentsContainer.appendChild(commentElement);
    noCommentsMessage.style.display = 'none';

    // Increment total comments
    const totalComments = document.getElementById('totalComments');
    totalComments.textContent = parseInt(totalComments.textContent, 10) + 1;
};

// Update average rating
const updateAverageRating = () => {
    const commentsContainer = document.getElementById('commentsList');
    const comments = commentsContainer.querySelectorAll('.comment');

    let totalRating = 0;
    comments.forEach((comment) => {
        const stars = comment.querySelector('.stars').textContent;
        totalRating += stars.split('★').length - 1;
    });

    const averageRating = totalRating / comments.length;
    const averageRatingStars = document.getElementById('averageRatingStars');
    const averageRatingValue = document.getElementById('averageRatingValue');

    averageRatingStars.textContent = '★'.repeat(Math.round(averageRating)) + '☆'.repeat(5 - Math.round(averageRating));
    averageRatingValue.textContent = `(${averageRating.toFixed(1)})`;
};

// Clear form fields
const clearForm = () => {
    document.getElementById('commentForm').reset();
};

// Smooth scroll for navigation links
document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});