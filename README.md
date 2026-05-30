# ✦ ARTVERLAY ✦
### Premium Neo-Brutalist HTML Layer Art Studio

![Artverlay Premium Neo-Brutalist Logo](C:\Users\Viphu\.gemini\antigravity\brain\840ff629-aa53-4d2b-b5b0-46ca0c1fcabf\artverlay_brutal_logo_1780169601812.png)

**Artverlay** คือเว็บแอปพลิเคชันสำหรับสร้างสรรค์งานศิลปะ Generative Layer Art แบบจัดวางเลเยอร์ด้วย HTML, CSS Scoped และ WYSIWYG Shape Generators โดยถูกออกแบบภายใต้สไตล์ **Neo-Brutalist** ที่เน้นสีสันจัดจ้าน แผงขอบดำหนาคมชัด และเด้งเงามิติเฉียบขาด โครงการนี้รองรับระบบทัชสกรีนบนมือถืออย่างสมบูรณ์แบบร้อยเปอร์เซ็นต์!

---

## ⚡ Key Features (คุณสมบัติเด่น)

### 1. 🎛️ WYSIWYG Shape Config Sliders (ระบบสร้างรูปทรงสำเร็จรูป)
สร้างและปรับแต่งรูปทรงยอดนิยมได้ทันทีผ่านตัวเลขสไลด์และสีสัน โดยไม่ต้องเขียนโค้ด:
* **ประเภทรูปทรง**: *Badge (ป้ายชื่อ), Circle (วงกลม), Square (สี่เหลี่ยม), Triangle (สามเหลี่ยม), Star (รูปดาว), Grid Table (ตารางเซลล์)* และ *Text Only (ตัวอักษรล้วน)*
* **ระบบปรับจูนละเอียด**: แบบอักษร (Google Fonts), ขนาดอักษร, ระยะขอบในตัวรูปทรง, ความโค้งมนขอบ, ระยะพิกัดเงาเด้ง และปรับจำนวนคอลัมน์/แถวของตาราง Grid ได้สด ๆ 

### 2. 💻 Real-Time Scoped CSS & HTML Editors (ตัวแก้ไขโค้ดที่ปลอดภัย)
* **Scoped CSS Compile**: เขียนโค้ดสไตล์สำหรับวัตถุชิ้นนั้น ๆ ได้โดยไม่รบกวนกัน ระบบเบื้องหลังจะสแกนวงเล็บเปิดปิดแบบตัวต่อตัว (Brace-Tracking) เพื่อจัดกลุ่มคีย์เฟรมและนำคำนำหน้า `#layer-ID` ไปใส่ครอบคลาส ทำให้สไตล์เฉพาะตัวไม่รั่วไหลไปนอกกรอบ
* **HTML Injector**: แทรกสัญลักษณ์ SVG, ข้อความตัวอักษรศิลป์ หรือโครงสร้าง Spans ได้อย่างอิสระ

### 3. 📱 Mobile Responsive Mastery (การรองรับระบบพกพาสูงสุด)
* **Sticky Tabbed UI**: บนหน้าจอมือถือ แถบข้างเมนูจะหลบหลีกไป และเพิ่มแถบสลับแท็บความคมชัดสูง Neo-Brutalist `[🥞 Layers] [🎛️ Sliders] [💻 CSS Code] [📦 Exports]` ล็อคติดอยู่ข้างใต้พรีวิววัตถุ ช่วยลดการเลื่อนหน้าจอ (Scrolling) ลงอย่างสิ้นเชิง
* **Native Touch dragging & resizing**: รองรับ Touch Events (`touchstart`, `touchmove`, `touchend`) และทำการบล็อกการเลื่อนหน้าเว็บขณะลากถูชิ้นส่วน ช่วยให้ลากวัตถุและ resizing บนจอสัมผัสได้ลื่นไหลไร้สะดุด
* **Tap-To-Add Shapes**: แค่สัมผัสที่รูปทรงในเมนู วัตถุจะลอยไปสปอว์นกลาง Canvas ทันทีบนอุปกรณ์มือถือ

### 4. 📐 Tightly Fitted Selection Borders (กรอบปรับวัตถุกระชับ)
* กรอบเส้นประสีเหลืองย่อขยาย (`inset: -6px`) โอบล้อมรอบตัวขอบเขตของวัตถุแต่ละขนาดอย่างแม่นยำ ไม่คลุมกว้างเต็มหน้าจอ ช่วยให้เห็นขอบข่ายการดีไซน์ที่แท้จริง

### 5. 📦 High-Fidelity Multi-Format Exports (การส่งออกครบเครื่อง)
* **Single self-contained HTML**: ส่งออกเป็นหน้าเว็บอิสระที่รวม HTML, Scoped CSS และ **ระบบเมาส์พารัลแลกซ์ (Interactive Mouse Parallax)** ลอยไปตามการขยับเมาส์ไว้ในไฟล์เดียว เปิดใช้งานที่ไหนก็ได้!
* **PNG High-Res Capture**: บันทึกภาพผลงานเป็นไฟล์รูปภาพความละเอียดสูง
* **Project JSON State**: เซฟและโหลดประวัติความคืบหน้าของโครงการเพื่อมาแก้ไขต่อในภายหลัง

---

## 🛠️ Project Structure (โครงสร้างโครงการ)

```text
Artverlay/
├── public/                 # ไอคอนFavicon และไฟล์สาธารณะ
│   └── favicon.png         # โลโก้แท็บบราวเซอร์รูปหัวใจ/สัญลักษณ์ Artverlay
├── src/
│   ├── assets/             # รูปภาพและสไตล์ชีทประกอบ
│   ├── components/
│   │   ├── Canvas.jsx      # กล่องแสดงผล คอนเทนเนอร์สัมผัสยึดเกาะ และ double-click แก้ไขข้อความ
│   │   ├── CodeEditor.jsx  # แผงแก้ไข HTML & Scoped CSS
│   │   ├── LayerList.jsx   # ตัวจัดการลำดับคอลัมน์ ลบ ปิดตา และทำซ้ำเลเยอร์
│   │   ├── NeoButton.jsx   # ปุ่มสไตล์นีโอบรูทัลเงาดำหนา
│   │   └── VisualSliders.jsx # สไลเดอร์กรุ๊ปหมวดหมู่ความคลาสสิก WYSIWYG
│   ├── utils/
│   │   ├── generator.js    # คอมไพเลอร์แปลงสไลเดอร์เป็น HTML/CSS โครงสร้างดิบ
│   │   └── templates.js    # คอลเลกชันผลงานเทมเพลตต้นแบบ (Bauhaus, Vaporwave, ฯลฯ)
│   ├── App.jsx             # จุดศูนย์กลางการจัดการสถานะและเลย์เอาต์สลับแท็บ
│   ├── index.css           # ดีไซน์ซิสเต็ม ตัวแปรสีนีโอบรูทัล และการจัดเรียง Flex/Grid
│   └── main.jsx            # จุดเริ่มต้นเรนเดอร์ React
├── index.html              # ไฟล์ HTML ต้นกำเนิด (ดึงฟอนต์และ Favicon โลโก้ใหม่)
└── package.json            # ปลั๊กอินและสคริปต์การพัฒนา
```

---

## 🚀 Getting Started (วิธีการเปิดใช้งานตัวโปรแกรม)

### Prerequisites (สิ่งที่ต้องมี)
* **Node.js** (เวอร์ชัน 18 ขึ้นไป)
* **npm** หรือโปรแกรมช่วยแพ็คอื่น ๆ 

### Installation & Execution (การติดตั้งและรัน)

1. ติดตั้งไลบรารีที่จำเป็นทั้งหมด:
   ```bash
   npm install
   ```

2. เปิดเซิร์ฟเวอร์จำลองการพัฒนา (Local Development Server):
   ```bash
   npm run dev
   ```
   จากนั้นกดเปิดลิงก์เพื่อเข้าใช้งานที่ **[http://localhost:5173](http://localhost:5173)** ในบราวเซอร์ของคุณ!

3. การสร้างชุดประกอบสำหรับนำไปใช้งานจริง (Build Production Bundle):
   ```bash
   npm run build
   ```

---

## 🎨 Premium Neo-Brutalist Colors Palette

สไตล์บรูทัลลิสต์ของ Artverlay ขับเคลื่อนด้วยสีโทนพิเศษดังนี้:
* **Brutalist Yellow**: `#FFDE4D` ✦
* **Brutalist Pink**: `#FF6B9D` ✦
* **Brutalist Cyan**: `#26E6E6` ✦
* **Brutalist Green**: `#4ADE80` ✦
* **Brutalist Orange**: `#FF7E47` ✦
* **Brutalist Purple**: `#A78BFA` ✦

---

### Developed with ✦ for Creativity and High-End UX
