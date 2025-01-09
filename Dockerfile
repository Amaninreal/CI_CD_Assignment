FROM node:21

RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg2 \
    unzip \
    xvfb \
    libxss1 \
    libappindicator3-1 \
    libindicator3-7 \
    fonts-liberation \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    xdg-utils \
    ca-certificates

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && DISTRO=$(lsb_release -c | awk '{print $2}') \
    && echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update -y \
    && apt-get install -y google-chrome-stable

RUN CHROME_DRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE) \
    && wget -q "https://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip" \
    && unzip chromedriver_linux64.zip -d /usr/local/bin \
    && rm chromedriver_linux64.zip

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 9515

# Run Nightwatch tests
CMD ["npx", "nightwatch", "tests/loginPageTest.js", "--chrome", "env"]
