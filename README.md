# devops-test

Website tinh demo quy trinh CI/CD:

Developer -> GitHub -> Jenkins -> Build -> Deploy -> Telegram

## Chay local

    npm install
    npm run build
    # mo dist/index.html bang trinh duyet

## Cau truc

- `src/index.html` : source website
- `build.js`       : script build (copy src -> dist, co kiem tra loi)
- `Jenkinsfile`    : dinh nghia pipeline
