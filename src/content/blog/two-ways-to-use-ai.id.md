---
title: "Ada Dua Cara yang Sangat Berbeda untuk Pakai AI. Kebanyakan Orang Cuma Tau Satu."
date: 2026-03-07
categories:
  - ai-and-work
description: Aku udah pakai Claude Code buat bangun website-ku. Tapi untuk urusan konten, aku masih bolak-balik ke chat AI dan banyak copy-paste. Sampai aku sadar, itu nggak perlu.
draft: false
---

Beberapa minggu lalu aku nemu diri sendiri lagi nanya ke chatbot kenapa Magnus Carlsen begitu dominan di catur. Bukan karena butuh buat kerjaan. Murni penasaran, di sore hari Minggu. Dan jawabannya bagus. Penjelasan yang jelas soal presisi endgame-nya, pendekatan psikologisnya, kemampuannya buat grind posisi yang kebanyakan grandmaster udah nerima sebagai draw.

Interaksi kayak gitu yang kebanyakan orang maksud waktu ngomongin pakai AI. Kamu nanya sesuatu, AI jelasin sesuatu. Berguna kayak teman yang sangat banyak baca, tapi tersedia jam 11 malam dan nggak pernah bosan sama pertanyaanmu.

Tapi beberapa bulan terakhir aku mulai pakai AI dengan cara yang sama sekali berbeda. Dan perbedaan antara dua cara itu ternyata lebih penting dari yang aku kira.

---

Aku nulis di samyongzhi.com. Website-nya sendiri dibangun pakai Claude Code. Bagian itu udah aku figureout. Tapi untuk urusan konten, nulis draft, proofreading, menerjemahkan tulisan ke Bahasa Indonesia, nyari angle yang tepat untuk sebuah tulisan, semua itu masih aku lakuin di chat interface-nya Claude atau ChatGPT. Terus copy hasilnya. Paste ke tempat yang bener. Balik lagi ke Claude Code buat bagian teknisnya. Banyak pindah-pindah antara tools dan jendela.

Yang baru aku sadari belakangan, semua bolak-balik itu nggak perlu. Claude Code bisa handle pekerjaan konten juga, selama konteksnya ada. Memory files yang udah aku setup berarti dia udah tau gaya nulisku, audienceku, struktur tulisanku, konvensi Bahasa Indonesia yang aku pakai untuk versi terjemahannya. Aku nggak perlu paste semua itu. Udah ada di sana.

---

Nerbitin satu tulisan melibatkan lebih banyak langkah dari yang kebanyakan orang kira. Ini proses aktualnya:

Nulis draft. Terjemahin ke Bahasa Indonesia, karena istriku orang Indonesia dan sebagian besar audienceku juga. Update codebase website dengan file-file baru. Push perubahan itu ke GitHub, yang otomatis trigger website live untuk update. Terus sync tulisan ke Notion, yang aku pakai sebagai arsip dan referensi pribadi.

Lima langkah. Masing-masing melibatkan file berbeda, tools berbeda, atau sistem berbeda. Kalau dikerjain lewat chat interface, kamu masih lakuin sebagian besar perpindahannya sendiri. AI kasih output. Tapi dia nggak beneran mindahin apa-apa.

---

Analogi yang bantu aku ngerti perbedaannya: pakai chat AI itu kayak briefing kontraktor di ruang meeting. Kamu jelasin pekerjaannya, mereka kasih rencana atau draft, kamu bawa balik sendiri ke tempat kerja. Pakai agent itu kayak ada orang yang duduk di mejamu. Mereka bisa buka file-mu, lihat kondisi aktualnya, dan langsung lakuin langkah berikutnya.

Kemampuan dasarnya sama. Pengalamannya sama sekali berbeda.

Untuk workflow publikasi aku, ini berarti aku bisa jelasin apa yang aku butuhkan dan lihat dia kerja melalui seluruh urutan langkah. Draft, terjemah, buat file yang tepat, push ke GitHub, update Notion. Nggak selalu sempurna. Tapi terus berjalan, tanpa aku harus copy-paste antar tools.

---

Ada satu momen yang bikin perubahan ini jadi sangat konkret buat aku.

Claude Code terus pause di tengah workflow buat minta izin sebelum mengambil setiap tindakan. Perilaku yang masuk akal, jujur aja. Tapi aku sempat pergi sebentar dari laptop, balik lagi, dan nemuin prosesnya berhenti total, nunggu aku approve langkah berikutnya.

Karena penasaran, aku nanya ke Claude Code gimana cara ngatasinnya. Dia jelasin bahwa dia bisa update settingnya sendiri. Dan dia walk through opsi-opsinya, dari minta izin untuk hampir segalanya sampai beroperasi dengan jauh lebih banyak otonomi.

Aku duduk sebentar dengan pikiran itu. Aku baru aja nanya ke sebuah tool gimana cara kasih dirinya sendiri lebih banyak kebebasan untuk bertindak. Dan dia jawab langsung, jelasin tradeoff-nya, dan biarkan aku yang memutuskan.

Itu bukan cara aku mikirin chatbot. Itu sesuatu yang berbeda.

---

Anak-anak perempuanku berusia tujuh tahun. Mereka pakai AI kayak kebanyakan anak seusia mereka waktu nemu teknologi ini: nanya pertanyaan, dapet jawaban, lanjut. Sama kayak aku pakai Google waktu kecil, cuma lebih cepat dan lebih seperti percakapan.

Tapi tools yang bakal mereka pakai sebagai orang dewasa akan jauh lebih mirip dengan yang aku ceritain di atas. Bukan "tanya sesuatu dan dapet jawaban," tapi "deskripsikan tujuan dan biarkan dia kerja melalui langkah-langkahnya."

Skill yang penting untuk itu bukan teknis. Bukan soal tau cara coding atau ngerti cara kerja language model. Ini soal tau cara mecah tujuan menjadi langkah-langkah yang jelas. Cara mendeskripsikan apa yang kamu mau, dengan cukup presisi sehingga sesuatu bisa bertindak berdasarkan itu. Cara review apa yang balik dan nilai apakah itu beneran bener.

Itu problem decomposition. Itu critical thinking yang diterapkan pada output yang nggak kamu produksi sendiri. Kita bisa ajarkan itu sekarang, dalam konteks yang nggak ada hubungannya sama AI, jauh sebelum anak-anak kita perlu mengarahkan agent melalui workflow yang kompleks.

---

Mental model kebanyakan orang tentang AI dibangun di sekitar chat interface, karena itulah yang kebanyakan orang udah habiskan waktu dengannya. Tools-nya udah bergerak lebih jauh dari mental model-nya.

Worth buat memperhatikan mana yang sebenernya kamu raih, dan apakah task-nya beneran cocok.
