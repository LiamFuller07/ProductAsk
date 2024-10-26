document.addEventListener('DOMContentLoaded', () => {
    const describeButton = document.getElementById('describeButton');
    const questionBox = document.getElementById('questionBox');

    describeButton.addEventListener('click', async () => {
        const productId = describeButton.dataset.productId;  // Assume the product ID is passed as a data attribute
        const response = await fetch(`/product/${productId}`);
        const product = await response.json();

        document.getElementById('description').textContent = product.body_html;  // or customize with AI-generated descriptions
    });

    questionBox.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const question = questionBox.value;
            // Send question to the backend for an AI-generated response
            const response = await fetch('/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });
            const answer = await response.json();

            document.getElementById('answer').textContent = answer.response;
        }
    });
});
