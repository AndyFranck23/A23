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
                    <div class="image-item" onclick="selectImage('${image.url}')">
                        <img src="${image.url}" alt="${image.name}" class="image-thumbnail"/>
                        
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
            console.log(imageName)
            const imageUrl = `${imageName}`;
            if (Array.isArray(form.image))
                setForm(prev => ({ ...prev, image: [...prev.image, imageUrl] }))
            else
                setForm({ ...form, image: imageUrl })

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
                    <div class="image-item" onclick="selectImage('${image.url}')">
                        <img src="${image.url}" alt="${image.name}" class="image-thumbnail"/>
                        
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
            const imageUrl = `${imageName}`;
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


export const DeleteConfirmation = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null; // Ne s'affiche que si isOpen est true

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-5 xs:px:0">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-800">Attention !!</h2>
                <p className="text-gray-600 mt-2">
                    {message || "Êtes-vous sûr de vouloir supprimer cet élément ?"}
                </p>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

// Utilitaire pour faire un fetch avec gestion d’erreur et timeout
export async function safeFetch(url, options = {}) {
    // const controller = new AbortController();
    // const timeoutId = setTimeout(() => controller.abort(), 10_000); // 10s timeout

    try {
        const res = await fetch(url, {
            ...options,
            // signal: controller.signal,
            // cache: 'no-store',  // désactive la mise en cache
            next: { revalidate: 60 }
        });
        // clearTimeout(timeoutId);

        if (!res.ok) {
            throw new Error(`Erreur HTTP ${res.status}`);
        }
        return res.json();
    } catch (err) {
        console.error(`Fetch failed for ${url}:`, err);
        return null;
    }
}