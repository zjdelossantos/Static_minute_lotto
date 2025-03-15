        // Create confetti effect
        function createConfetti() {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
            const confettiCount = 200;
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random position, color, and shape
                const left = Math.random() * 100;
                const width = Math.random() * 12 + 5;
                const height = Math.random() * 12 + 5;
                const colorIndex = Math.floor(Math.random() * colors.length);
                const shape = Math.random() > 0.5 ? 'square' : 'rectangle';
                
                confetti.style.left = `${left}%`;
                confetti.style.width = `${width}px`;
                confetti.style.height = shape === 'square' ? `${width}px` : `${height}px`;
                confetti.style.backgroundColor = colors[colorIndex];
                confetti.style.opacity = Math.random() * 0.5 + 0.5;
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                // Animation
                const duration = Math.random() * 3 + 2;
                const delay = Math.random();
                
                confetti.style.animation = `fall ${duration}s ease-in ${delay}s infinite`;
                confetti.style.top = '-20px';
                
                document.body.appendChild(confetti);
                
                // Define fall animation
                const fallAnimation = `
                    @keyframes fall {
                        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                        75% { opacity: 1; }
                        100% { transform: translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg); opacity: 0; }
                    }
                `;
                
                // Add animation to style
                const style = document.createElement('style');
                style.innerHTML = fallAnimation;
                document.head.appendChild(style);
            }
        }
        
        // Create star effects
        function createStars() {
            const starCount = 30;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                const size = Math.random() * 20 + 10;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${left}%`;
                star.style.top = `${top}%`;
                star.style.animationDuration = `${Math.random() * 3 + 2}s`;
                star.style.opacity = Math.random() * 0.7 + 0.3;
                
                document.body.appendChild(star);
            }
        }
        
        // Create firework effects
        function createFireworks() {
            const fireworkCount = 8;
            const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#ffa500'];
            
            for (let i = 0; i < fireworkCount; i++) {
                setTimeout(() => {
                    const firework = document.createElement('div');
                    firework.className = 'firework';
                    
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    
                    firework.style.left = `${left}%`;
                    firework.style.top = `${top}%`;
                    firework.style.backgroundColor = color;
                    firework.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
                    
                    document.body.appendChild(firework);
                    
                    // Define explode animation uniquely for this firework
                    const explodeAnimation = `
                        @keyframes explode${i} {
                            0% { transform: scale(1); opacity: 1; }
                            100% { transform: scale(30); opacity: 0; }
                        }
                    `;
                    
                    const style = document.createElement('style');
                    style.innerHTML = explodeAnimation;
                    document.head.appendChild(style);
                    
                    firework.style.animation = `explode${i} 1s ease-out forwards`;
                    
                    // Remove after animation is complete
                    setTimeout(() => {
                        firework.remove();
                        style.remove();
                    }, 1000);
                    
                }, i * 500);
            }
        }
        
        // Initialize animations
        window.addEventListener('DOMContentLoaded', () => {
            createConfetti();
            createStars();
            setInterval(createFireworks, 4000);
            
            // Add click event to continue button
            document.querySelector('.continue-btn').addEventListener('click', () => {
                window.location.href = 'lottongpinoy.html';
            });
        });
