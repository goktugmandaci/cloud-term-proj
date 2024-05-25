# Base image olarak Python 3.8 kullanıyoruz
FROM python:3.8-slim

# Çalışma dizinini oluştur ve ayarla
WORKDIR /usr/src/app

# Gereken bağımlılıkları yüklemek için requirements.txt dosyasını kopyala
COPY requirements.txt ./

# Bağımlılıkları yükle
RUN pip install --no-cache-dir -r requirements.txt

# locust.py dosyasını çalışma dizinine kopyala
COPY locust.py .

# locust'u çalıştır
CMD ["locust", "-f", "locust.py"]
