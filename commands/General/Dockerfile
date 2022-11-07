FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/OminduAnjane/Queen-Lara-Md /root/OminduAnjane
WORKDIR /root/OminduAnjane/
RUN yarn install --network-concurrency 1
CMD ["node", "lib/client.js"]
