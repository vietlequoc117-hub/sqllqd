import { DatabaseConfig, DatabaseId } from '../types';

export const DATABASES: Record<DatabaseId, DatabaseConfig> = {
  HOC_SINH: {
    id: 'HOC_SINH',
    name: 'CSDL Học Sinh',
    subtitle: 'Bảng điểm & Hồ sơ học sinh (Hình 1)',
    description: 'Cơ sở dữ liệu quản lý thông tin lý lịch, tổ học tập và điểm số hai môn Toán, Văn của học sinh phổ thông.',
    badge: 'Đơn Bảng • Giáo Dục',
    iconClass: 'fa-solid fa-graduation-cap',
    ddl: `
CREATE TABLE HOC_SINH (
  MaSo INTEGER PRIMARY KEY AUTOINCREMENT,
  HoDem TEXT NOT NULL,
  Ten TEXT NOT NULL,
  GT TEXT CHECK(GT IN ('Nam', 'Nữ')),
  DoanVien BOOLEAN NOT NULL DEFAULT 0,
  NgSinh DATE,
  DiaChi TEXT,
  To_hoc INTEGER NOT NULL,
  Toan REAL,
  Van REAL
);
    `.trim(),
    seed: `
INSERT INTO HOC_SINH (MaSo, HoDem, Ten, GT, DoanVien, NgSinh, DiaChi, To_hoc, Toan, Van) VALUES
(1, 'Trần Minh', 'Hoàng', 'Nam', 1, '2007-03-15', '12 Phố Huế, Hà Nội', 1, 8.5, 7.5),
(2, 'Nguyễn Thị', 'Mai', 'Nữ', 1, '2007-06-22', '45 Tràng Tiền, Hà Nội', 1, 9.0, 8.5),
(3, 'Lê Văn', 'Tuấn', 'Nam', 0, '2007-01-10', '88 Cầu Giấy, Hà Nội', 2, 6.5, 6.0),
(4, 'Phạm Thu', 'Hà', 'Nữ', 1, '2007-09-05', '19 Tôn Đức Thắng, Hà Nội', 2, 8.0, 9.0),
(5, 'Vũ Đức', 'Nam', 'Nam', 0, '2007-11-18', '33 Bạch Mai, Hà Nội', 3, 7.0, 7.0),
(6, 'Đỗ Quỳnh', 'Nga', 'Nữ', 1, '2007-04-30', '102 Nguyễn Trãi, Hà Nội', 3, 9.5, 9.2),
(7, 'Hoàng Trọng', 'Khánh', 'Nam', 1, '2007-08-12', '56 Lạc Long Quân, Hà Nội', 1, 7.5, 8.0),
(8, 'Bùi Thảo', 'Vy', 'Nữ', 0, '2007-12-25', '21 Ngọc Lâm, Long Biên', 2, 8.5, 8.8);
    `.trim(),
    mermaidErd: `
erDiagram
    HOC_SINH {
        int MaSo PK "Khóa chính tự tăng"
        string HoDem "Họ và tên đệm"
        string Ten "Tên học sinh"
        string GT "Giới tính (Nam/Nữ)"
        boolean DoanVien "Đoàn viên (0/1)"
        date NgSinh "Ngày sinh"
        string DiaChi "Địa chỉ cư trú"
        int To_hoc "Tổ học tập (1, 2, 3)"
        float Toan "Điểm môn Toán"
        float Van "Điểm môn Văn"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Học sinh Tổ 1 có điểm Toán từ 8.0 trở lên',
        sql: `SELECT MaSo, HoDem || ' ' || Ten AS HoTen, GT, Toan, Van\nFROM HOC_SINH\nWHERE\nTo_hoc = 1 AND Toan >= 8.0;`,
        explanation: 'Truy vấn lọc các học sinh thuộc Tổ 1 và có điểm môn Toán đạt từ 8.0 trở lên, ghép cột Họ đệm và Tên.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê điểm trung bình Toán & Văn theo từng Tổ',
        sql: `SELECT To_hoc, COUNT(*) AS SiSo, ROUND(AVG(Toan), 2) AS DTB_Toan, ROUND(AVG(Van), 2) AS DTB_Van\nFROM HOC_SINH\nGROUP BY To_hoc;`,
        explanation: 'Sử dụng GROUP BY và hàm gộp COUNT, AVG để tính sĩ số và điểm trung bình từng tổ.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Danh sách Đoàn viên có điểm trung bình hai môn >= 8.0',
        sql: `SELECT MaSo, HoDem, Ten, Toan, Van, ROUND((Toan + Van) / 2.0, 2) AS DTB\nFROM HOC_SINH\nWHERE\nDoanVien = 1 AND (Toan + Van) / 2.0 >= 8.0\nORDER BY DTB DESC;`,
        explanation: 'Lọc đoàn viên có điểm trung bình Toán - Văn từ 8.0 trở lên, sắp xếp giảm dần theo điểm trung bình.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Cập nhật điểm Văn cho bạn học sinh mã số 3 lên 7.0',
        sql: `UPDATE HOC_SINH\nSET Van = 7.0\nWHERE\nMaSo = 3;`,
        explanation: 'Lệnh DML UPDATE dùng để chỉnh sửa thông tin điểm số của học sinh có MaSo = 3.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Học sinh có điểm Toán cao nhất trong mỗi Tổ (Subquery)',
        sql: `SELECT h.To_hoc, h.HoDem || ' ' || h.Ten AS ThuKhoaToan, h.Toan\nFROM HOC_SINH h\nWHERE\nh.Toan = (\n    SELECT MAX(sub.Toan)\n    FROM HOC_SINH sub\n    WHERE\n    sub.To_hoc = h.To_hoc\n);`,
        explanation: 'Sử dụng Correlated Subquery để tìm học sinh đạt điểm Toán cao nhất ở từng tổ.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  KINH_DOANH: {
    id: 'KINH_DOANH',
    name: 'CSDL Kinh Doanh',
    subtitle: 'Khách hàng, Mặt hàng & Hóa đơn (Hình 2)',
    description: 'Cơ sở dữ liệu bán hàng gồm 3 bảng quan hệ: Khách hàng đặt mua các Mặt hàng thông qua Hóa đơn bán lẻ.',
    badge: '3 Bảng • Bán Hàng',
    iconClass: 'fa-solid fa-store',
    ddl: `
CREATE TABLE KHACH_HANG (
  Ma_khach_hang TEXT PRIMARY KEY,
  Ho_ten TEXT NOT NULL,
  Dia_chi TEXT
);

CREATE TABLE MAT_HANG (
  Ma_mat_hang TEXT PRIMARY KEY,
  Ten_mat_hang TEXT NOT NULL,
  Don_gia REAL NOT NULL
);

CREATE TABLE HOA_DON (
  So_don TEXT PRIMARY KEY,
  Ma_khach_hang TEXT NOT NULL,
  Ma_mat_hang TEXT NOT NULL,
  So_luong INTEGER NOT NULL CHECK(So_luong > 0),
  Ngay_giao_hang DATE NOT NULL,
  FOREIGN KEY (Ma_khach_hang) REFERENCES KHACH_HANG(Ma_khach_hang),
  FOREIGN KEY (Ma_mat_hang) REFERENCES MAT_HANG(Ma_mat_hang)
);
    `.trim(),
    seed: `
INSERT INTO KHACH_HANG (Ma_khach_hang, Ho_ten, Dia_chi) VALUES
('KH01', 'Nguyễn Văn An', 'Hà Nội'),
('KH02', 'Trần Thị Bích', 'Hải Phòng'),
('KH03', 'Lê Hoàng Long', 'Đà Nẵng'),
('KH04', 'Phạm Minh Châu', 'TP. Hồ Chí Minh'),
('KH05', 'Võ Quốc Hưng', 'Cần Thơ');

INSERT INTO MAT_HANG (Ma_mat_hang, Ten_mat_hang, Don_gia) VALUES
('MH01', 'Bánh quy Danisa 681g', 125000),
('MH02', 'Kẹo dừa sáp Bến Tre', 48000),
('MH03', 'Cà phê G7 hoà tan (50 gói)', 72000),
('MH04', 'Sổ tay bìa da A5', 85000),
('MH05', 'Bút bi cao cấp Parker', 210000);

INSERT INTO HOA_DON (So_don, Ma_khach_hang, Ma_mat_hang, So_luong, Ngay_giao_hang) VALUES
('HD001', 'KH01', 'MH01', 3, '2024-03-01'),
('HD002', 'KH01', 'MH03', 2, '2024-03-02'),
('HD003', 'KH02', 'MH02', 5, '2024-03-05'),
('HD004', 'KH03', 'MH05', 1, '2024-03-08'),
('HD005', 'KH04', 'MH01', 4, '2024-03-10'),
('HD006', 'KH04', 'MH04', 2, '2024-03-12'),
('HD007', 'KH02', 'MH05', 2, '2024-03-15');
    `.trim(),
    mermaidErd: `
erDiagram
    KHACH_HANG ||--o{ HOA_DON : "đặt hàng"
    MAT_HANG ||--o{ HOA_DON : "chi tiết mua"
    KHACH_HANG {
        string Ma_khach_hang PK "Mã khách hàng"
        string Ho_ten "Họ và tên khách"
        string Dia_chi "Địa chỉ khách hàng"
    }
    MAT_HANG {
        string Ma_mat_hang PK "Mã mặt hàng"
        string Ten_mat_hang "Tên mặt hàng"
        float Don_gia "Đơn giá sản phẩm"
    }
    HOA_DON {
        string So_don PK "Số hóa đơn"
        string Ma_khach_hang FK "Khóa ngoại tham chiếu KHACH_HANG"
        string Ma_mat_hang FK "Khóa ngoại tham chiếu MAT_HANG"
        int So_luong "Số lượng mua"
        date Ngay_giao_hang "Ngày giao nhận hàng"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Chi tiết các hóa đơn kèm tên Khách, tên Mặt hàng và Thành tiền',
        sql: `SELECT hd.So_don, kh.Ho_ten, mh.Ten_mat_hang, hd.So_luong, mh.Don_gia, (hd.So_luong * mh.Don_gia) AS Thanh_tien, hd.Ngay_giao_hang\nFROM HOA_DON hd\nJOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang\nORDER BY hd.So_don;`,
        explanation: 'Kết hợp 3 bảng bằng phép INNER JOIN để hiển thị thông tin đầy đủ và tính tiền thành phẩm.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê tổng doanh thu theo từng Mặt hàng',
        sql: `SELECT mh.Ma_mat_hang, mh.Ten_mat_hang, SUM(hd.So_luong) AS Tong_so_luong_ban, SUM(hd.So_luong * mh.Don_gia) AS Tong_doanh_thu\nFROM MAT_HANG mh\nLEFT JOIN HOA_DON hd ON mh.Ma_mat_hang = hd.Ma_mat_hang\nGROUP BY mh.Ma_mat_hang, mh.Ten_mat_hang\nORDER BY Tong_doanh_thu DESC;`,
        explanation: 'Sử dụng LEFT JOIN và hàm SUM để tính tổng số lượng bán và doanh thu cho từng sản phẩm.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Khách hàng có tổng chi tiêu mua sắm cao nhất',
        sql: `SELECT kh.Ma_khach_hang, kh.Ho_ten, kh.Dia_chi, SUM(hd.So_luong * mh.Don_gia) AS Tong_chi_tieu\nFROM KHACH_HANG kh\nJOIN HOA_DON hd ON kh.Ma_khach_hang = hd.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang\nGROUP BY kh.Ma_khach_hang, kh.Ho_ten\nORDER BY Tong_chi_tieu DESC\nLIMIT 1;`,
        explanation: 'Nhóm theo khách hàng, tính tổng tiền chi tiêu và lấy vị trí đầu bảng với LIMIT 1.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thêm đơn hàng mới cho khách hàng KH03 mua 2 Bánh quy',
        sql: `INSERT INTO HOA_DON (So_don, Ma_khach_hang, Ma_mat_hang, So_luong, Ngay_giao_hang)\nVALUES ('HD008', 'KH03', 'MH01', 2, '2024-03-20');`,
        explanation: 'Thêm dòng mới vào bảng HOA_DON đảm bảo toàn vẹn khóa ngoại tham chiếu.',
        difficulty: 'Cơ bản',
      },
    ],
  },

  HOC_TAP: {
    id: 'HOC_TAP',
    name: 'CSDL Học Tập',
    subtitle: 'Học sinh, Môn học & Bảng điểm (Hình 3)',
    description: 'Cơ sở dữ liệu theo dõi quá trình học tập, các môn học và lịch sử điểm số các lần kiểm tra của học sinh.',
    badge: '3 Bảng • Điểm Số',
    iconClass: 'fa-solid fa-book-open',
    ddl: `
CREATE TABLE HOC_SINH (
  Ma_hoc_sinh TEXT PRIMARY KEY,
  Ho_dem TEXT NOT NULL,
  Ten TEXT NOT NULL
);

CREATE TABLE MON_HOC (
  Ma_mon_hoc TEXT PRIMARY KEY,
  Ten_mon_hoc TEXT NOT NULL
);

CREATE TABLE BANG_DIEM (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Ma_hoc_sinh TEXT NOT NULL,
  Ma_mon_hoc TEXT NOT NULL,
  Ngay_kiem_tra DATE NOT NULL,
  Diem_so REAL NOT NULL CHECK(Diem_so >= 0 AND Diem_so <= 10),
  FOREIGN KEY (Ma_hoc_sinh) REFERENCES HOC_SINH(Ma_hoc_sinh),
  FOREIGN KEY (Ma_mon_hoc) REFERENCES MON_HOC(Ma_mon_hoc)
);
    `.trim(),
    seed: `
INSERT INTO HOC_SINH (Ma_hoc_sinh, Ho_dem, Ten) VALUES
('HS01', 'Nguyễn Quốc', 'Cường'),
('HS02', 'Trần Thanh', 'Thảo'),
('HS03', 'Lê Hữu', 'Đức'),
('HS04', 'Phạm Thuỳ', 'Trang'),
('HS05', 'Đinh Tiến', 'Dũng');

INSERT INTO MON_HOC (Ma_mon_hoc, Ten_mon_hoc) VALUES
('TOAN', 'Toán học'),
('TIN', 'Tin học'),
('VAN', 'Ngữ văn'),
('ANH', 'Tiếng Anh'),
('LY', 'Vật lí');

INSERT INTO BANG_DIEM (Ma_hoc_sinh, Ma_mon_hoc, Ngay_kiem_tra, Diem_so) VALUES
('HS01', 'TOAN', '2024-02-15', 9.0),
('HS01', 'TIN', '2024-02-18', 9.5),
('HS01', 'VAN', '2024-02-20', 7.5),
('HS02', 'TOAN', '2024-02-15', 8.5),
('HS02', 'VAN', '2024-02-20', 9.0),
('HS02', 'ANH', '2024-02-22', 9.5),
('HS03', 'TOAN', '2024-02-15', 6.0),
('HS03', 'TIN', '2024-02-18', 8.0),
('HS04', 'TOAN', '2024-02-15', 9.5),
('HS04', 'ANH', '2024-02-22', 8.5),
('HS05', 'LY', '2024-02-25', 8.0);
    `.trim(),
    mermaidErd: `
erDiagram
    HOC_SINH ||--o{ BANG_DIEM : "sở hữu"
    MON_HOC ||--o{ BANG_DIEM : "ghi nhận điểm"
    HOC_SINH {
        string Ma_hoc_sinh PK "Mã định danh học sinh"
        string Ho_dem "Họ và tên đệm"
        string Ten "Tên học sinh"
    }
    MON_HOC {
        string Ma_mon_hoc PK "Mã môn học"
        string Ten_mon_hoc "Tên đầy đủ môn học"
    }
    BANG_DIEM {
        int ID PK "Khóa chính tự tăng"
        string Ma_hoc_sinh FK "Tham chiếu học sinh"
        string Ma_mon_hoc FK "Tham chiếu môn học"
        date Ngay_kiem_tra "Ngày diễn ra kiểm tra"
        float Diem_so "Điểm số đạt được (0-10)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Bảng điểm chi tiết: Tên học sinh, Môn học, Điểm số',
        sql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, mh.Ten_mon_hoc, bd.Ngay_kiem_tra, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc\nORDER BY hs.Ma_hoc_sinh, bd.Ngay_kiem_tra;`,
        explanation: 'Truy vấn bảng điểm đầy đủ với liên kết 3 bảng học sinh, môn học và kết quả.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Điểm trung bình các bài kiểm tra của từng học sinh',
        sql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, COUNT(bd.ID) AS So_bai_KT, ROUND(AVG(bd.Diem_so), 2) AS Diem_trung_binh\nFROM HOC_SINH hs\nJOIN BANG_DIEM bd ON hs.Ma_hoc_sinh = bd.Ma_hoc_sinh\nGROUP BY hs.Ma_hoc_sinh, Ho_ten\nORDER BY Diem_trung_binh DESC;`,
        explanation: 'Thống kê điểm trung bình chung các môn đã kiểm tra của học sinh.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm học sinh đạt điểm môn Tin học cao nhất',
        sql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nWHERE\nbd.Ma_mon_hoc = 'TIN'\nORDER BY bd.Diem_so DESC\nLIMIT 1;`,
        explanation: 'Lọc riêng môn Tin học và lấy học sinh có điểm cao nhất.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê số lượng bài kiểm tra loại Giỏi (>= 8.5) theo môn học',
        sql: `SELECT mh.Ten_mon_hoc, COUNT(*) AS So_luong_diem_gioi\nFROM BANG_DIEM bd\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc\nWHERE\nbd.Diem_so >= 8.5\nGROUP BY mh.Ten_mon_hoc;`,
        explanation: 'Đếm số bài kiểm tra đạt từ 8.5 trở lên cho mỗi môn học.',
        difficulty: 'Trung bình',
      },
    ],
  },

  THU_VIEN: {
    id: 'THU_VIEN',
    name: 'CSDL Thư Viện',
    subtitle: 'Mượn trả sách thư viện trường (Hình 4)',
    description: 'Cơ sở dữ liệu thư viện chuẩn xác theo đề bài Hình 4: Quản lý người mượn, đầu sách và thông tin mượn trả.',
    badge: '3 Bảng • Thư Viện',
    iconClass: 'fa-solid fa-book-bookmark',
    ddl: `
CREATE TABLE NGUOI_MUON (
  So_the TEXT PRIMARY KEY,
  Ho_ten TEXT NOT NULL,
  Ngay_sinh DATE,
  Lop TEXT NOT NULL
);

CREATE TABLE SACH (
  Ma_so_sach TEXT PRIMARY KEY,
  Ten_sach TEXT NOT NULL,
  So_trang INTEGER NOT NULL,
  Tac_gia TEXT NOT NULL
);

CREATE TABLE MUON_SACH (
  So_the TEXT NOT NULL,
  Ma_so_sach TEXT NOT NULL,
  Ngay_muon DATE NOT NULL,
  Ngay_tra DATE,
  PRIMARY KEY (So_the, Ma_so_sach, Ngay_muon),
  FOREIGN KEY (So_the) REFERENCES NGUOI_MUON(So_the),
  FOREIGN KEY (Ma_so_sach) REFERENCES SACH(Ma_so_sach)
);
    `.trim(),
    seed: `
INSERT INTO NGUOI_MUON (So_the, Ho_ten, Ngay_sinh, Lop) VALUES
('TV-01', 'Nguyễn Anh', '2007-04-15', '12A'),
('TV-02', 'Trần Cương', '2008-09-20', '11B'),
('TV-03', 'Lê Văn Bình', '2007-11-05', '12B'),
('TV-04', 'Nguyễn Thị Dung', '2009-02-18', '10C');

INSERT INTO SACH (Ma_so_sach, Ten_sach, So_trang, Tac_gia) VALUES
('TN-102', 'Dế mèn phiêu lưu kí', 195, 'Tô Hoài'),
('TN-103', 'Hai vạn dặm dưới biển', 450, 'Giuyn Véc-nơ'),
('TI-01', 'Những điều kì diệu về máy tính', 280, 'Nguyễn Thế Hùng'),
('TO-012', 'Sáng tạo Toán học', 320, 'Polya');

INSERT INTO MUON_SACH (So_the, Ma_so_sach, Ngay_muon, Ngay_tra) VALUES
('TV-01', 'TN-102', '2024-03-01', '2024-03-10'),
('TV-02', 'TN-103', '2024-03-05', NULL),
('TV-02', 'TO-012', '2024-03-12', '2024-03-20'),
('TV-03', 'TI-01', '2024-03-15', '2024-03-22'),
('TV-04', 'TN-102', '2024-03-18', NULL);
    `.trim(),
    mermaidErd: `
erDiagram
    NGUOI_MUON ||--o{ MUON_SACH : "mượn sách"
    SACH ||--o{ MUON_SACH : "được mượn"
    NGUOI_MUON {
        string So_the PK "Số thẻ bạn đọc"
        string Ho_ten "Họ và tên người mượn"
        date Ngay_sinh "Ngày sinh"
        string Lop "Lớp học"
    }
    SACH {
        string Ma_so_sach PK "Mã số sách"
        string Ten_sach "Tên cuốn sách"
        int So_trang "Số trang sách"
        string Tac_gia "Tác giả cuốn sách"
    }
    MUON_SACH {
        string So_the PK "Khóa chính và Khóa ngoại NGUOI_MUON"
        string Ma_so_sach PK "Khóa chính và Khóa ngoại SACH"
        date Ngay_muon PK "Ngày mượn sách"
        date Ngay_tra "Ngày trả sách (NULL nếu chưa trả)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Tìm những cuốn sách có trên 200 trang mà Trần Cương đã mượn',
        sql: `SELECT s.Ma_so_sach, s.Ten_sach, s.So_trang, s.Tac_gia, ms.Ngay_muon, ms.Ngay_tra\nFROM MUON_SACH ms\nJOIN NGUOI_MUON nm ON ms.So_the = nm.So_the\nJOIN SACH s ON ms.Ma_so_sach = s.Ma_so_sach\nWHERE\nnm.Ho_ten = 'Trần Cương' AND s.So_trang > 200;`,
        explanation: 'Truy vấn chính xác theo câu hỏi mẫu trong đề bài: kết hợp 3 bảng, lọc theo tên bạn đọc và số trang sách > 200.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Danh sách những bạn đọc hiện đang mượn sách chưa trả',
        sql: `SELECT nm.So_the, nm.Ho_ten, nm.Lop, s.Ten_sach, ms.Ngay_muon\nFROM MUON_SACH ms\nJOIN NGUOI_MUON nm ON ms.So_the = nm.So_the\nJOIN SACH s ON ms.Ma_so_sach = s.Ma_so_sach\nWHERE\nms.Ngay_tra IS NULL;`,
        explanation: 'Kiểm tra điều kiện Ngay_tra IS NULL để xác định các lượt mượn chưa được trả sách về thư viện.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê số lần mượn của từng đầu sách',
        sql: `SELECT s.Ma_so_sach, s.Ten_sach, s.Tac_gia, COUNT(ms.So_the) AS So_lan_muon\nFROM SACH s\nLEFT JOIN MUON_SACH ms ON s.Ma_so_sach = ms.Ma_so_sach\nGROUP BY s.Ma_so_sach, s.Ten_sach\nORDER BY So_lan_muon DESC;`,
        explanation: 'Sử dụng LEFT JOIN và GROUP BY để đếm tần suất mượn của tất cả các đầu sách.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Cập nhật trả sách cho bạn Trần Cương (sách TN-103) ngày hôm nay',
        sql: `UPDATE MUON_SACH\nSET Ngay_tra = '2024-03-25'\nWHERE\nSo_the = 'TV-02' AND Ma_so_sach = 'TN-103' AND Ngay_tra IS NULL;`,
        explanation: 'Cập nhật trường Ngay_tra để ghi nhận việc trả sách.',
        difficulty: 'Cơ bản',
      },
    ],
  },

  AM_NHAC: {
    id: 'AM_NHAC',
    name: 'CSDL Âm Nhạc',
    subtitle: 'Nhạc sĩ, Ca sĩ, Bản nhạc & Bản thu âm (Hình 5)',
    description: 'Cơ sở dữ liệu âm nhạc chuẩn xác 100% theo Hình 5: Lưu trữ thông tin Nhạc sĩ, Ca sĩ, Bản nhạc và Bản thu âm.',
    badge: '4 Bảng • Âm Nhạc',
    iconClass: 'fa-solid fa-music',
    ddl: `
CREATE TABLE NHAC_SI (
  Aid INTEGER PRIMARY KEY,
  TenNS TEXT NOT NULL
);

CREATE TABLE CA_SI (
  Sid TEXT PRIMARY KEY,
  TenCS TEXT NOT NULL
);

CREATE TABLE BAN_NHAC (
  Mid TEXT PRIMARY KEY,
  Aid INTEGER NOT NULL,
  TenBN TEXT NOT NULL,
  FOREIGN KEY(Aid) REFERENCES NHAC_SI(Aid)
);

CREATE TABLE BAN_THU_AM (
  Mid TEXT NOT NULL,
  Sid TEXT NOT NULL,
  PRIMARY KEY (Mid, Sid),
  FOREIGN KEY(Mid) REFERENCES BAN_NHAC(Mid),
  FOREIGN KEY(Sid) REFERENCES CA_SI(Sid)
);
    `.trim(),
    seed: `
INSERT INTO NHAC_SI (Aid, TenNS) VALUES
(1, 'Đỗ Nhuận'),
(2, 'Văn Cao'),
(3, 'Hoàng Việt'),
(4, 'Nguyễn Tài Tuệ');

INSERT INTO CA_SI (Sid, TenCS) VALUES
('TK', 'Trần Khánh'),
('LD', 'Lê Dung'),
('TN', 'Tân Nhân'),
('QH', 'Quốc Hương');

INSERT INTO BAN_NHAC (Mid, Aid, TenBN) VALUES
('0001', 1, 'Du kích Sông Thao'),
('0002', 2, 'Trường ca Sông Lô'),
('0003', 3, 'Tình ca'),
('0004', 4, 'Xa khơi'),
('0005', 1, 'Việt Nam quê hương tôi'),
('0006', 2, 'Tiến về Hà Nội');

INSERT INTO BAN_THU_AM (Mid, Sid) VALUES
('0001', 'TK'),
('0001', 'QH'),
('0002', 'TK'),
('0003', 'QH'),
('0003', 'LD'),
('0004', 'TN'),
('0005', 'LD'),
('0006', 'TK');
    `.trim(),
    mermaidErd: `
erDiagram
    NHAC_SI ||--o{ BAN_NHAC : "sáng tác"
    BAN_NHAC ||--o{ BAN_THU_AM : "được ghi âm"
    CA_SI ||--o{ BAN_THU_AM : "thể hiện bài hát"
    NHAC_SI {
        int Aid PK "Mã nhạc sĩ"
        string TenNS "Tên nhạc sĩ"
    }
    CA_SI {
        string Sid PK "Mã ca sĩ"
        string TenCS "Tên ca sĩ"
    }
    BAN_NHAC {
        string Mid PK "Mã bản nhạc"
        int Aid FK "Tham chiếu Nhạc sĩ"
        string TenBN "Tên bản nhạc"
    }
    BAN_THU_AM {
        string Mid PK "Khóa chính và Khóa ngoại BAN_NHAC"
        string Sid PK "Khóa chính và Khóa ngoại CA_SI"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Danh sách tất cả bản thu âm: Tên bài hát, Ca sĩ & Nhạc sĩ sáng tác',
        sql: `SELECT bn.Mid, bn.TenBN, cs.TenCS, ns.TenNS\nFROM BAN_THU_AM bta\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN CA_SI cs ON bta.Sid = cs.Sid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nORDER BY bn.Mid, cs.TenCS;`,
        explanation: 'Kết hợp cả 4 bảng trong CSDL Âm nhạc để xem đầy đủ thông tin mỗi bản thu âm.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Những bản nhạc được thể hiện bởi nhiều hơn 1 ca sĩ',
        sql: `SELECT bn.Mid, bn.TenBN, COUNT(bta.Sid) AS So_ca_si_thu_am\nFROM BAN_NHAC bn\nJOIN BAN_THU_AM bta ON bn.Mid = bta.Mid\nGROUP BY bn.Mid, bn.TenBN\nHAVING COUNT(bta.Sid) > 1;`,
        explanation: 'Dùng GROUP BY kết hợp điều kiện lọc nhóm HAVING COUNT(bta.Sid) > 1.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê số lượng tác phẩm của từng nhạc sĩ đã sáng tác',
        sql: `SELECT ns.Aid, ns.TenNS, COUNT(bn.Mid) AS So_luong_tac_pham\nFROM NHAC_SI ns\nLEFT JOIN BAN_NHAC bn ON ns.Aid = bn.Aid\nGROUP BY ns.Aid, ns.TenNS\nORDER BY So_luong_tac_pham DESC;`,
        explanation: 'Đếm số bài hát do mỗi nhạc sĩ sáng tác bằng LEFT JOIN và hàm COUNT.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm các ca sĩ đã từng thể hiện sáng tác của nhạc sĩ Văn Cao',
        sql: `SELECT DISTINCT cs.Sid, cs.TenCS\nFROM CA_SI cs\nJOIN BAN_THU_AM bta ON cs.Sid = bta.Sid\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE\nns.TenNS = 'Văn Cao';`,
        explanation: 'Sử dụng DISTINCT để loại bỏ ca sĩ trùng lặp khi hát nhiều bài của nhạc sĩ Văn Cao.',
        difficulty: 'Nâng cao',
      },
    ],
  },
};
