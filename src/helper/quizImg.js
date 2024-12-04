import { Capacitor } from '@capacitor/core';

export class QuizImage {
  constructor(imageUrl, altText = 'Quiz question image') {
    this.imageUrl = imageUrl;
    this.altText = altText;
    this.element = this.createElement();
  }

  createElement() {
    const container = document.createElement('div');
    container.className = 'quiz-image-container';

    const img = document.createElement('img');
    img.className = 'quiz-image';
    img.alt = this.altText;

    // Add loading indicator
    const loadingSpinner = this.createLoadingSpinner();
    container.appendChild(loadingSpinner);

    // Handle image loading
    img.onload = () => {
      loadingSpinner.remove();
      img.classList.add('loaded');
    };

    // Handle image error
    img.onerror = () => {
      loadingSpinner.remove();
      container.appendChild(this.createErrorMessage());
    };

    // Set image source with proper URL handling
    img.src = this.processImageUrl(this.imageUrl);
    container.appendChild(img);

    return container;
  }

  processImageUrl(url) {
    if (!url) return '';
    
    // Handle HTTPS URLs (like Cloudinary)
    if (url.startsWith('https://')) {
      new Promise<HTMLImageElement>((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => resolve(img)
        img.onerror = reject
      });
      return url;
    }

    // Handle local files in native platform
    if (Capacitor.isNativePlatform()) {
      return Capacitor.convertFileSrc(url);
    }

    return url;
  }

  createLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    return spinner;
  }

  createErrorMessage() {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = 'Failed to load image';
    return error;
  }
}