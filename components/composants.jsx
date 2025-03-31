export const handleImageSelect = async (setForm, form) => {
    try {
        // Récupère la liste des images disponibles depuis l'API
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads`);
        const data = await response.json();

        // Si aucune image n'est trouvée, retourne une erreur
        if (!data.images || data.images.length === 0) {
            console.log("Aucune image disponible");
            return;
        }

        // Crée une fenêtre de sélection simple pour l'utilisateur
        const imageList = data.images.map((image, index) => {
            return `
                    <div class="image-item" onclick="selectImage('${image}')">
                        <img src="/api/uploads/${image}" alt="${image}" class="image-thumbnail"/>
                        
                    </div>
                `;
        }).join("");

        // Crée un élément modal pour afficher les images disponibles
        const modal = document.createElement("div");
        modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <h3>Choisir une image</h3>
                        <div class="image-gallery">
                            ${imageList}
                        </div>
                        <button class="close-modal" onclick="closeModal()">Fermer</button>
                    </div>
                </div>
            `;
        document.body.appendChild(modal);

        // Fonction pour sélectionner l'image et fermer le modal
        window.selectImage = (imageName) => {
            const imageUrl = `/api/uploads/${imageName}`;
            setForm(prev => ({ ...prev, image: [...prev.image, imageUrl] }))
            document.body.removeChild(modal);
        };

        // Fonction pour fermer le modal
        window.closeModal = () => {
            document.body.removeChild(modal);
        };

        // Appliquer les styles CSS avec un défilement
        const style = document.createElement('style');
        style.innerHTML = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                .modal-content {
                    background: #fff;
                    padding: 10px;
                    border-radius: 8px;
                    text-align: center;
                    width: 80%;
                    max-width: 600px;
                    max-height: 80vh; /* Limite la hauteur de la fenêtre modale */
                    overflow: hidden; /* Cache tout ce qui dépasse */
                }
                .modal-content h3 {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                .image-gallery {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 10px;
                    max-height: 60vh; /* Limite la hauteur de la galerie d'images */
                    overflow-y: auto; /* Permet le défilement vertical */
                }
                .image-item {
                    text-align: center;
                    cursor: pointer;
                }
                .image-thumbnail {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 4px;
                    margin-bottom: 5px;
                }
                .close-modal {
                    padding: 8px 15px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                }
                .close-modal:hover {
                    background-color: #0056b3;
                }
            `;
        document.head.appendChild(style);

    } catch (err) {
        console.log("Erreur lors de la récupération des images : ", err);
    }
};

export const isValidImage = (src) => {
    // Si src est vide ou pas une string
    if (!src || typeof src !== "string" || src == "") return false;

    // Vérifie les URLs absolues (http/https)
    if (src.startsWith("http://") || src.startsWith("https://")) {
        try {
            new URL(src); // Valide la structure de l'URL
            const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
            return imageExtensions.some(ext => src.toLowerCase().includes(ext));
        } catch {
            return false; // URL malformée
        }
    }

    // Vérifie les chemins relatifs valides (commençant par / ou ./)
    if (src.startsWith("/") || src.startsWith("./")) {
        const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
        return imageExtensions.some(ext => src.toLowerCase().endsWith(ext));
    }

    return false;
}

export const handleImageBrowser = async (callback) => {
    try {
        // Récupère la liste des images disponibles depuis l'API
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads`);
        const data = await response.json();

        // Si aucune image n'est trouvée, retourne une erreur
        if (!data.images || data.images.length === 0) {
            console.log("Aucune image disponible");
            return;
        }

        // Crée une fenêtre de sélection simple pour l'utilisateur
        const imageList = data.images.map((image, index) => {
            return `
                    <div class="image-item" onclick="selectImage('${image}')">
                        <img src="/api/uploads/${image}" alt="${image}" class="image-thumbnail"/>
                        
                    </div>
                `;
        }).join("");

        // Crée un élément modal pour afficher les images disponibles
        const modal = document.createElement("div");
        modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <h3>Choisir une image</h3>
                        <div class="image-gallery">
                            ${imageList}
                        </div>
                        <button class="close-modal" onclick="closeModal()">Fermer</button>
                    </div>
                </div>
            `;
        document.body.appendChild(modal);

        // Fonction pour sélectionner l'image et fermer le modal
        window.selectImage = (imageName) => {
            const imageUrl = `/api/uploads/${imageName}`;
            callback(imageUrl, { title: imageName });
            document.body.removeChild(modal);
        };

        // Fonction pour fermer le modal
        window.closeModal = () => {
            document.body.removeChild(modal);
        };

        // Appliquer les styles CSS avec un défilement
        const style = document.createElement('style');
        style.innerHTML = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                .modal-content {
                    background: #fff;
                    padding: 10px;
                    border-radius: 8px;
                    text-align: center;
                    width: 80%;
                    max-width: 600px;
                    max-height: 80vh; /* Limite la hauteur de la fenêtre modale */
                    overflow: hidden; /* Cache tout ce qui dépasse */
                }
                .modal-content h3 {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                .image-gallery {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 10px;
                    max-height: 60vh; /* Limite la hauteur de la galerie d'images */
                    overflow-y: auto; /* Permet le défilement vertical */
                }
                .image-item {
                    text-align: center;
                    cursor: pointer;
                }
                .image-thumbnail {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 4px;
                    margin-bottom: 5px;
                }
                .close-modal {
                    padding: 8px 15px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                }
                .close-modal:hover {
                    background-color: #0056b3;
                }
            `;
        document.head.appendChild(style);

    } catch (err) {
        console.log("Erreur lors de la récupération des images : ", err);
    }
};