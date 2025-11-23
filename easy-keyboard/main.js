function main() {

    const bodyMarks = document.getElementsByClassName('display-mark');

    const doc = document.getElementById('document');
    const cursor = document.getElementById('cursor');

    [...bodyMarks].forEach(mark => {
        mark.onclick = () => {
            const markImage = [...mark.childNodes]
                              .filter(ch => ch.nodeType === Node.ELEMENT_NODE && ch.tagName === 'IMG')
                              [0]
            const clonedImage = markImage.cloneNode(true);
            const newMark = document.createElement('div');
            newMark.classList.add('mark');
            newMark.appendChild(clonedImage);
            cursor.appendChild(newMark);
        }
    });

}