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
(1, 'Trần Minh', 'Hoàng', 'Nam', 1, '2007-03-15', 'Hà Nội', 1, 8.5, 7.5),
(2, 'Nguyễn Thị', 'Mai', 'Nữ', 1, '2007-06-22', 'Hà Nội', 1, 9.0, 8.5),
(3, 'Lê Văn', 'Tuấn', 'Nam', 0, '2007-01-10', 'Đà Nẵng', 2, 6.5, 6.0),
(4, 'Phạm Thu', 'Hà', 'Nữ', 1, '2007-09-05', 'Hà Nội', 2, 8.0, 9.0),
(5, 'Vũ Đức', 'Nam', 'Nam', 0, '2007-11-18', 'Hà Nội', 3, 7.0, 7.0),
(6, 'Đỗ Quỳnh', 'Nga', 'Nữ', 1, '2007-04-30', 'Hà Nội', 3, 9.5, 9.2),
(7, 'Hoàng Trọng', 'Khánh', 'Nam', 1, '2007-08-12', 'Đà Nẵng', 1, 7.5, 8.0),
(8, 'Bùi Thảo', 'Vy', 'Nữ', 0, '2007-12-25', 'Ngọc Lâm', 2, 8.5, 8.8);
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
        sql: `SELECT MaSo, HoDem || ' ' || Ten AS HoTen, GT, Toan, Van\nFROM HOC_SINH\nWHERE To_hoc = 1 AND Toan >= 8.0;`,
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
        sql: `SELECT MaSo, HoDem, Ten, Toan, Van, ROUND((Toan + Van) / 2.0, 2) AS DTB\nFROM HOC_SINH\nWHERE DoanVien = 1 AND (Toan + Van) / 2.0 >= 8.0\nORDER BY DTB DESC;`,
        explanation: 'Lọc đoàn viên có điểm trung bình Toán - Văn từ 8.0 trở lên, sắp xếp giảm dần theo điểm trung bình.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Cập nhật điểm Văn cho bạn học sinh mã số 3 lên 7.0',
        sql: `UPDATE HOC_SINH\nSET Van = 7.0\nWHERE MaSo = 3;`,
        explanation: 'Lệnh DML UPDATE dùng để chỉnh sửa thông tin điểm số của học sinh có MaSo = 3.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Học sinh có điểm Toán cao nhất trong mỗi Tổ (Subquery)',
        sql: `SELECT h.To_hoc, h.HoDem || ' ' || h.Ten AS ThuKhoaToan, h.Toan\nFROM HOC_SINH h\nWHERE h.Toan = (\n    SELECT MAX(sub.Toan)\n    FROM HOC_SINH sub\n    WHERE sub.To_hoc = h.To_hoc\n);`,
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
        sql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nWHERE bd.Ma_mon_hoc = 'TIN'\nORDER BY bd.Diem_so DESC\nLIMIT 1;`,
        explanation: 'Lọc riêng môn Tin học và lấy học sinh có điểm cao nhất.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê số lượng bài kiểm tra loại Giỏi (>= 8.5) theo môn học',
        sql: `SELECT mh.Ten_mon_hoc, COUNT(*) AS So_luong_diem_gioi\nFROM BANG_DIEM bd\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc\nWHERE bd.Diem_so >= 8.5\nGROUP BY mh.Ten_mon_hoc;`,
        explanation: 'Đếm số bài kiểm tra đạt từ 8.5 trở lên cho mỗi môn học.',
        difficulty: 'Trung bình',
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
        sql: `SELECT DISTINCT cs.Sid, cs.TenCS\nFROM CA_SI cs\nJOIN BAN_THU_AM bta ON cs.Sid = bta.Sid\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';`,
        explanation: 'Sử dụng DISTINCT để loại bỏ ca sĩ trùng lặp khi hát nhiều bài của nhạc sĩ Văn Cao.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  QL_XE: {
    id: 'QL_XE',
    name: 'CSDL QL_XE',
    subtitle: 'Loại xe, Danh mục xe & Hóa đơn bán hàng',
    description: 'Cơ sở dữ liệu quản lý bán xe gồm 3 bảng quan hệ: LOAI_XE, DANH_MUC_XE và HOA_DON bán lẻ.',
    badge: '3 Bảng • Quản Lý Xe',
    iconClass: 'fa-solid fa-motorcycle',
    ddl: `
CREATE TABLE LOAI_XE (
  MaLoai TEXT PRIMARY KEY,
  LoaiXe TEXT NOT NULL
);

CREATE TABLE DANH_MUC_XE (
  MaXe TEXT PRIMARY KEY,
  TenXe TEXT NOT NULL,
  MaLoai TEXT NOT NULL,
  FOREIGN KEY (MaLoai) REFERENCES LOAI_XE(MaLoai)
);

CREATE TABLE HOA_DON (
  SoHD TEXT PRIMARY KEY,
  MaXe TEXT NOT NULL,
  NgayBan DATE NOT NULL,
  SoLuong INTEGER NOT NULL CHECK(SoLuong > 0),
  DonGia REAL NOT NULL CHECK(DonGia > 0),
  FOREIGN KEY (MaXe) REFERENCES DANH_MUC_XE(MaXe)
);
    `.trim(),
    seed: `
INSERT INTO LOAI_XE (MaLoai, LoaiXe) VALUES
('L01', 'Xe số'),
('L02', 'Xe tay ga'),
('L03', 'Xe côn tay'),
('L04', 'Xe máy điện');

INSERT INTO DANH_MUC_XE (MaXe, TenXe, MaLoai) VALUES
('X01', 'Wave Alpha', 'L01'),
('X02', 'Future 125 FI', 'L01'),
('X03', 'Vision', 'L02'),
('X04', 'Air Blade 160', 'L02'),
('X05', 'SH 150i', 'L02'),
('X06', 'Winner X', 'L03'),
('X07', 'Exciter 155 VVA', 'L03'),
('X08', 'VinFast Feliz S', 'L04'),
('X09', 'VinFast Klara S', 'L04');

INSERT INTO HOA_DON (SoHD, MaXe, NgayBan, SoLuong, DonGia) VALUES
('HD01', 'X01', '2024-01-15', 2, 18500000),
('HD02', 'X03', '2024-01-18', 1, 33500000),
('HD03', 'X04', '2024-02-02', 3, 44000000),
('HD04', 'X05', '2024-02-10', 1, 98000000),
('HD05', 'X06', '2024-02-15', 2, 46000000),
('HD06', 'X02', '2024-03-01', 1, 31500000),
('HD07', 'X03', '2024-03-12', 4, 33000000),
('HD08', 'X07', '2024-03-20', 2, 49000000),
('HD09', 'X08', '2024-04-05', 5, 29900000),
('HD10', 'X04', '2024-04-18', 2, 44500000);
    `.trim(),
    mermaidErd: `
erDiagram
    LOAI_XE ||--o{ DANH_MUC_XE : "thuộc loại"
    DANH_MUC_XE ||--o{ HOA_DON : "được bán trong"
    LOAI_XE {
        string MaLoai PK "Mã loại xe (VD: L01, L02)"
        string LoaiXe "Tên loại xe (Xe số, Xe tay ga...)"
    }
    DANH_MUC_XE {
        string MaXe PK "Mã xe (VD: X01, X02)"
        string TenXe "Tên dòng xe"
        string MaLoai FK "Mã loại xe tham chiếu LOAI_XE"
    }
    HOA_DON {
        string SoHD PK "Số hóa đơn bán lẻ"
        string MaXe FK "Mã xe tham chiếu DANH_MUC_XE"
        date NgayBan "Ngày bán hàng"
        int SoLuong "Số lượng bán (CHECK > 0)"
        float DonGia "Đơn giá bán thực tế (CHECK > 0)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Danh sách xe kèm tên loại xe tương ứng (INNER JOIN)',
        sql: `SELECT x.MaXe, x.TenXe, l.LoaiXe\nFROM DANH_MUC_XE x\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai\nORDER BY l.LoaiXe, x.TenXe;`,
        explanation: 'Kết hợp bảng DANH_MUC_XE và LOAI_XE qua khóa ngoại MaLoai để xem loại của từng dòng xe.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Chi tiết các hóa đơn: Tên xe, Ngày bán, Số lượng, Đơn giá và Thành tiền',
        sql: `SELECT hd.SoHD, hd.NgayBan, x.TenXe, l.LoaiXe, hd.SoLuong, hd.DonGia, (hd.SoLuong * hd.DonGia) AS ThanhTien\nFROM HOA_DON hd\nJOIN DANH_MUC_XE x ON hd.MaXe = x.MaXe\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai\nORDER BY hd.NgayBan DESC;`,
        explanation: 'Nối 3 bảng để hiển thị đầy đủ thông tin hóa đơn bán hàng và tính cột Thành tiền = Số lượng * Đơn giá.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê tổng số xe đã bán và tổng doanh thu theo từng Loại xe',
        sql: `SELECT l.MaLoai, l.LoaiXe,\n       COALESCE(SUM(hd.SoLuong), 0) AS TongSoLuongBan,\n       COALESCE(SUM(hd.SoLuong * hd.DonGia), 0) AS TongDoanhThu\nFROM LOAI_XE l\nLEFT JOIN DANH_MUC_XE x ON l.MaLoai = x.MaLoai\nLEFT JOIN HOA_DON hd ON x.MaXe = hd.MaXe\nGROUP BY l.MaLoai, l.LoaiXe\nORDER BY TongDoanhThu DESC;`,
        explanation: 'Sử dụng LEFT JOIN và GROUP BY để tính tổng số lượng xe bán và tổng doanh thu cho từng loại xe.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Top dòng xe bán chạy nhất (Tổng số lượng bán >= 3 xe)',
        sql: `SELECT x.MaXe, x.TenXe, SUM(hd.SoLuong) AS TongDaBan, SUM(hd.SoLuong * hd.DonGia) AS DoanhThuXe\nFROM DANH_MUC_XE x\nJOIN HOA_DON hd ON x.MaXe = hd.MaXe\nGROUP BY x.MaXe, x.TenXe\nHAVING SUM(hd.SoLuong) >= 3\nORDER BY TongDaBan DESC;`,
        explanation: 'Gộp theo từng xe và sử dụng điều kiện nhóm HAVING SUM(hd.SoLuong) >= 3 để lọc các xe bán chạy.',
        difficulty: 'Nâng cao',
      },
      {
        title: 'Tìm các dòng xe trong danh mục chưa bán được hóa đơn nào',
        sql: `SELECT x.MaXe, x.TenXe, l.LoaiXe\nFROM DANH_MUC_XE x\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai\nLEFT JOIN HOA_DON hd ON x.MaXe = hd.MaXe\nWHERE hd.SoHD IS NULL;`,
        explanation: 'Sử dụng LEFT JOIN kết hợp điều kiện WHERE hd.SoHD IS NULL để tìm xe chưa có phát sinh giao dịch bán.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  QL_VANG: {
    id: 'QL_VANG',
    name: 'CSDL QL_VANG',
    subtitle: 'Quản Lý Kinh Doanh Vàng Bạc Đá Quý (3 Bảng)',
    description: 'Cơ sở dữ liệu quản lý tiệm vàng gồm bảng Loại vàng (LOAI_VANG), Danh mục sản phẩm vàng & trang sức (SAN_PHAM), và Phiếu bán hàng (PHIEU_BAN) có trọng lượng, tiền công và đơn giá niêm yết.',
    badge: '3 Bảng • Kinh Doanh Vàng',
    iconClass: 'fa-solid fa-coins',
    ddl: `
CREATE TABLE LOAI_VANG (
  MaLoai TEXT PRIMARY KEY,
  TenLoai TEXT NOT NULL,
  GiaNiemYet REAL NOT NULL CHECK(GiaNiemYet > 0)
);

CREATE TABLE SAN_PHAM (
  MaSP TEXT PRIMARY KEY,
  TenSP TEXT NOT NULL,
  MaLoai TEXT NOT NULL,
  TrongLuong REAL NOT NULL CHECK(TrongLuong > 0),
  TienCong REAL NOT NULL DEFAULT 0 CHECK(TienCong >= 0),
  FOREIGN KEY (MaLoai) REFERENCES LOAI_VANG(MaLoai)
);

CREATE TABLE PHIEU_BAN (
  SoPhieu TEXT PRIMARY KEY,
  MaSP TEXT NOT NULL,
  NgayBan DATE NOT NULL,
  SoLuong INTEGER NOT NULL CHECK(SoLuong > 0),
  DonGiaBan REAL NOT NULL CHECK(DonGiaBan > 0),
  FOREIGN KEY (MaSP) REFERENCES SAN_PHAM(MaSP)
);
    `.trim(),
    seed: `
INSERT INTO LOAI_VANG (MaLoai, TenLoai, GiaNiemYet) VALUES
('LV01', 'Vàng 24K (999.9)', 8250000),
('LV02', 'Vàng miếng SJC', 8550000),
('LV03', 'Vàng Tây 18K (75%)', 5950000),
('LV04', 'Vàng Trắng 14K (58.3%)', 4650000);

INSERT INTO SAN_PHAM (MaSP, TenSP, MaLoai, TrongLuong, TienCong) VALUES
('SP01', 'Nhẫn tròn trơn 1 chỉ', 'LV01', 1.0, 50000),
('SP02', 'Nhẫn tròn trơn 2 chỉ', 'LV01', 2.0, 80000),
('SP03', 'Kiềng cưới hoa mai 24K', 'LV01', 5.0, 750000),
('SP04', 'Vàng miếng SJC 1 lượng', 'LV02', 10.0, 0),
('SP05', 'Vàng miếng SJC 5 chỉ', 'LV02', 5.0, 0),
('SP06', 'Dây chuyền nam mắt xích 18K', 'LV03', 3.5, 450000),
('SP07', 'Lắc tay nữ đính đá 18K', 'LV03', 2.2, 380000),
('SP08', 'Nhẫn đính hôn kim cương 14K', 'LV04', 0.8, 600000),
('SP09', 'Bông tai ngọc trai 14K', 'LV04', 1.2, 320000),
('SP10', 'Mặt dây chuyền thánh giá 18K', 'LV03', 1.5, 250000);

INSERT INTO PHIEU_BAN (SoPhieu, MaSP, NgayBan, SoLuong, DonGiaBan) VALUES
('PB01', 'SP01', '2024-03-01', 2, 8250000),
('PB02', 'SP04', '2024-03-05', 1, 85500000),
('PB03', 'SP06', '2024-03-08', 1, 21200000),
('PB04', 'SP02', '2024-03-15', 3, 16550000),
('PB05', 'SP08', '2024-03-20', 1, 4320000),
('PB06', 'SP03', '2024-04-02', 1, 42000000),
('PB07', 'SP07', '2024-04-10', 2, 13470000),
('PB08', 'SP01', '2024-04-18', 4, 8280000),
('PB09', 'SP09', '2024-05-02', 1, 5900000),
('PB10', 'SP06', '2024-05-15', 1, 21300000);
    `.trim(),
    mermaidErd: `
erDiagram
    LOAI_VANG ||--o{ SAN_PHAM : "phân loại"
    SAN_PHAM ||--o{ PHIEU_BAN : "bán trong"
    LOAI_VANG {
        string MaLoai PK "Mã loại vàng (LV01, LV02...)"
        string TenLoai "Tên loại vàng (24K, SJC, 18K, 14K)"
        float GiaNiemYet "Giá niêm yết (VNĐ/chỉ)"
    }
    SAN_PHAM {
        string MaSP PK "Mã sản phẩm trang sức/vàng"
        string TenSP "Tên sản phẩm"
        string MaLoai FK "Mã loại vàng tham chiếu LOAI_VANG"
        float TrongLuong "Trọng lượng (chỉ)"
        float TienCong "Tiền công chế tác (VNĐ)"
    }
    PHIEU_BAN {
        string SoPhieu PK "Số phiếu bán lẻ"
        string MaSP FK "Mã sản phẩm tham chiếu SAN_PHAM"
        date NgayBan "Ngày lập phiếu bán"
        int SoLuong "Số lượng sản phẩm bán (CHECK > 0)"
        float DonGiaBan "Đơn giá bán thực tế (CHECK > 0)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Danh sách sản phẩm kèm tên loại vàng và giá niêm yết (JOIN)',
        sql: `SELECT sp.MaSP, sp.TenSP, lv.TenLoai, sp.TrongLuong, sp.TienCong, lv.GiaNiemYet\nFROM SAN_PHAM sp\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai\nORDER BY lv.TenLoai, sp.TrongLuong DESC;`,
        explanation: 'Nối bảng SAN_PHAM và LOAI_VANG để xem chi tiết sản phẩm cùng giá niêm yết hiện hành của loại vàng tương ứng.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Chi tiết các phiếu bán hàng: Tên sản phẩm, Ngày bán, Số lượng, Đơn giá & Thành tiền',
        sql: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, lv.TenLoai, pb.SoLuong, pb.DonGiaBan, (pb.SoLuong * pb.DonGiaBan) AS ThanhTien\nFROM PHIEU_BAN pb\nJOIN SAN_PHAM sp ON pb.MaSP = sp.MaSP\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai\nORDER BY pb.NgayBan DESC;`,
        explanation: 'Kết hợp 3 bảng để hiển thị đầy đủ phiếu bán hàng và tính toán tổng tiền thanh toán của mỗi giao dịch.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tổng doanh thu và số lượng bán theo từng Loại vàng (LEFT JOIN & GROUP BY)',
        sql: `SELECT lv.MaLoai, lv.TenLoai,\n       COALESCE(SUM(pb.SoLuong), 0) AS TongSoLuongBan,\n       COALESCE(SUM(pb.SoLuong * pb.DonGiaBan), 0) AS TongDoanhThu\nFROM LOAI_VANG lv\nLEFT JOIN SAN_PHAM sp ON lv.MaLoai = sp.MaLoai\nLEFT JOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nGROUP BY lv.MaLoai, lv.TenLoai\nORDER BY TongDoanhThu DESC;`,
        explanation: 'Sử dụng LEFT JOIN kết hợp hàm gộp SUM để thống kê doanh số bán theo từng loại vàng, kể cả loại chưa bán.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Top các sản phẩm trang sức có doanh thu bán trên 30 triệu đồng',
        sql: `SELECT sp.MaSP, sp.TenSP, SUM(pb.SoLuong) AS TongDaBan, SUM(pb.SoLuong * pb.DonGiaBan) AS DoanhThuSP\nFROM SAN_PHAM sp\nJOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nGROUP BY sp.MaSP, sp.TenSP\nHAVING SUM(pb.SoLuong * pb.DonGiaBan) >= 30000000\nORDER BY DoanhThuSP DESC;`,
        explanation: 'Gộp theo sản phẩm và áp dụng điều kiện nhóm HAVING trên doanh thu bán để lọc ra các sản phẩm đem lại doanh thu cao.',
        difficulty: 'Nâng cao',
      },
      {
        title: 'Tìm các sản phẩm vàng trong danh mục chưa có phát sinh giao dịch bán (LEFT JOIN)',
        sql: `SELECT sp.MaSP, sp.TenSP, lv.TenLoai, sp.TrongLuong, sp.TienCong\nFROM SAN_PHAM sp\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai\nLEFT JOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nWHERE pb.SoPhieu IS NULL;`,
        explanation: 'Sử dụng LEFT JOIN kết hợp điều kiện WHERE pb.SoPhieu IS NULL để lọc ra các mẫu sản phẩm chưa từng xuất hiện trên phiếu bán nào.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  QL_CANBO: {
    id: 'QL_CANBO',
    name: 'CSDL QL_Canbo',
    subtitle: 'Quản Lý Cán Bộ & Phòng Ban (3 Bảng)',
    description: 'Cơ sở dữ liệu quản lý nhân sự cơ quan gồm 3 bảng: Phòng ban (PHONG), Danh sách cán bộ (CANBO) và Trình độ văn hóa, chuyên môn & ngoại ngữ (TRINHDOVANHOA).',
    badge: '3 Bảng • Quản Lý Cán Bộ',
    iconClass: 'fa-solid fa-id-card-clip',
    ddl: `
CREATE TABLE PHONG (
  MaPh TEXT PRIMARY KEY,
  TenPh TEXT NOT NULL,
  DiaChi TEXT
);

CREATE TABLE CANBO (
  MaCB TEXT PRIMARY KEY,
  Ten TEXT NOT NULL,
  NgaySinh DATE,
  Luong REAL NOT NULL CHECK(Luong > 0),
  MaPh TEXT NOT NULL,
  FOREIGN KEY (MaPh) REFERENCES PHONG(MaPh)
);

CREATE TABLE TRINHDOVANHOA (
  MaCB TEXT PRIMARY KEY,
  TrinhDoHV TEXT NOT NULL,
  TrinhDoNN TEXT NOT NULL,
  FOREIGN KEY (MaCB) REFERENCES CANBO(MaCB)
);
    `.trim(),
    seed: `
INSERT INTO PHONG (MaPh, TenPh, DiaChi) VALUES
('PH01', 'Phòng Kỹ thuật', 'Tầng 1 Nhà A'),
('PH02', 'Phòng Tổ chức', 'Tầng 2 Nhà A'),
('PH03', 'Phòng Kế toán', 'Tầng 1 Nhà B'),
('PH04', 'Phòng Kế hoạch', 'Tầng 3 Nhà B'),
('PH05', 'Phòng Đối ngoại', 'Tầng 4 Nhà C');

INSERT INTO CANBO (MaCB, Ten, NgaySinh, Luong, MaPh) VALUES
('CB01', 'Nguyễn Văn An', '1985-03-15', 18500000, 'PH01'),
('CB02', 'Trần Thị Bình', '1990-08-22', 14000000, 'PH02'),
('CB03', 'Lê Hoàng Cường', '1982-11-05', 24000000, 'PH01'),
('CB04', 'Phạm Minh Đức', '1995-04-18', 12500000, 'PH03'),
('CB05', 'Vũ Thị Hoa', '1988-12-30', 16000000, 'PH02'),
('CB06', 'Đặng Quốc Hưng', '1980-06-14', 28000000, 'PH04'),
('CB07', 'Hoàng Ngọc Lan', '1993-01-20', 13500000, 'PH03'),
('CB08', 'Bùi Văn Long', '1987-09-09', 19000000, 'PH01'),
('CB09', 'Đỗ Mai Phương', '1992-05-27', 15500000, 'PH04'),
('CB10', 'Ngô Quang Thắng', '1998-10-12', 11000000, 'PH01');

INSERT INTO TRINHDOVANHOA (MaCB, TrinhDoHV, TrinhDoNN) VALUES
('CB01', 'Thạc sĩ', 'Tiếng Anh B2'),
('CB02', 'Cử nhân', 'Tiếng Pháp B1'),
('CB03', 'Tiến sĩ', 'Tiếng Anh C1'),
('CB04', 'Cử nhân', 'Tiếng Anh B1'),
('CB05', 'Thạc sĩ', 'Tiếng Trung HSK5'),
('CB06', 'Tiến sĩ', 'Tiếng Anh C1'),
('CB07', 'Cử nhân', 'Tiếng Anh B2'),
('CB08', 'Kỹ sư', 'Tiếng Nhật N2'),
('CB09', 'Thạc sĩ', 'Tiếng Anh B2');
    `.trim(),
    mermaidErd: `
erDiagram
    PHONG ||--o{ CANBO : "thuộc về"
    CANBO ||--o| TRINHDOVANHOA : "có trình độ"
    PHONG {
        string MaPh PK "Mã phòng ban (PH01, PH02...)"
        string TenPh "Tên phòng ban"
        string DiaChi "Địa chỉ / Vị trí phòng"
    }
    CANBO {
        string MaCB PK "Mã cán bộ (CB01, CB02...)"
        string Ten "Họ và tên cán bộ"
        date NgaySinh "Ngày sinh"
        float Luong "Lương cơ bản (VNĐ)"
        string MaPh FK "Mã phòng tham chiếu PHONG"
    }
    TRINHDOVANHOA {
        string MaCB PK,FK "Mã cán bộ tham chiếu CANBO"
        string TrinhDoHV "Trình độ học vấn (Tiến sĩ, Thạc sĩ...)"
        string TrinhDoNN "Trình độ ngoại ngữ (Tiếng Anh, Pháp...)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Danh sách cán bộ kèm tên phòng ban và địa chỉ làm việc (INNER JOIN)',
        sql: `SELECT cb.MaCB, cb.Ten, cb.NgaySinh, cb.Luong, p.TenPh, p.DiaChi\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nORDER BY p.TenPh, cb.Luong DESC;`,
        explanation: 'Nối bảng CANBO và PHONG qua khóa ngoại MaPh để hiển thị đầy đủ thông tin nhân sự và đơn vị trực thuộc.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Hồ sơ cán bộ đầy đủ: Tên, Phòng ban, Lương, Trình độ học vấn & Ngoại ngữ',
        sql: `SELECT cb.MaCB, cb.Ten, p.TenPh, cb.Luong, td.TrinhDoHV, td.TrinhDoNN\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nLEFT JOIN TRINHDOVANHOA td ON cb.MaCB = td.MaCB\nORDER BY cb.Luong DESC;`,
        explanation: 'Kết hợp 3 bảng (sử dụng LEFT JOIN với TRINHDOVANHOA) để xem toàn bộ thông tin lương và văn hóa của từng cán bộ.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê số lượng cán bộ và tổng quỹ lương theo từng Phòng ban (LEFT JOIN & GROUP BY)',
        sql: `SELECT p.MaPh, p.TenPh,\n       COUNT(cb.MaCB) AS SoCanBo,\n       COALESCE(SUM(cb.Luong), 0) AS TongQuyLuong,\n       COALESCE(ROUND(AVG(cb.Luong), 2), 0) AS LuongTrungBinh\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nGROUP BY p.MaPh, p.TenPh\nORDER BY TongQuyLuong DESC;`,
        explanation: 'Thống kê quy mô nhân sự và quỹ lương của từng phòng ban, bao gồm cả phòng chưa có cán bộ (PH05).',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm các phòng ban có mức lương bình quân từ 18.000.000 đồng trở lên',
        sql: `SELECT p.MaPh, p.TenPh, COUNT(cb.MaCB) AS SoCanBo, ROUND(AVG(cb.Luong), 2) AS LuongBinhQuan\nFROM PHONG p\nJOIN CANBO cb ON p.MaPh = cb.MaPh\nGROUP BY p.MaPh, p.TenPh\nHAVING AVG(cb.Luong) >= 18000000\nORDER BY LuongBinhQuan DESC;`,
        explanation: 'Nhóm theo phòng ban và sử dụng mệnh đề HAVING để lọc ra các đơn vị có thu nhập bình quân cao.',
        difficulty: 'Nâng cao',
      },
      {
        title: 'Tìm phòng ban chưa có nhân sự hoặc cán bộ chưa có thông tin trình độ (LEFT JOIN)',
        sql: `SELECT p.MaPh, p.TenPh, p.DiaChi\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nWHERE cb.MaCB IS NULL;`,
        explanation: 'Sử dụng LEFT JOIN kết hợp WHERE IS NULL để phát hiện phòng ban mới thành lập chưa phân bổ cán bộ.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  QL_TV: {
    id: 'QL_TV',
    name: 'CSDL QL_TV',
    subtitle: 'Quản Lý Thư Viện (4 Bảng)',
    description: 'Cơ sở dữ liệu quản lý thư viện trường học gồm 4 bảng: Tác giả (TACGIA), Sách (SACH), Độc giả (DOCGIA) và Nhật ký Mượn trả sách (MUON_TRA).',
    badge: '4 Bảng • Quản Lý Thư Viện',
    iconClass: 'fa-solid fa-book-atlas',
    ddl: `
CREATE TABLE TACGIA (
  MaTG TEXT PRIMARY KEY,
  TenTG TEXT NOT NULL,
  DiaChi TEXT,
  SoDT TEXT
);

CREATE TABLE SACH (
  MaSach TEXT PRIMARY KEY,
  TenSach TEXT NOT NULL,
  TheLoai TEXT NOT NULL,
  NamXB INTEGER,
  MaTG TEXT NOT NULL,
  FOREIGN KEY (MaTG) REFERENCES TACGIA(MaTG)
);

CREATE TABLE DOCGIA (
  MaDG TEXT PRIMARY KEY,
  TenDG TEXT NOT NULL,
  NgaySinh DATE,
  DiaChi TEXT,
  SoDT TEXT
);

CREATE TABLE MUON_TRA (
  MaPhieu TEXT PRIMARY KEY,
  MaDG TEXT NOT NULL,
  MaSach TEXT NOT NULL,
  NgayMuon DATE NOT NULL,
  NgayTra DATE,
  TrangThai TEXT NOT NULL CHECK(TrangThai IN ('Đang mượn', 'Đã trả', 'Quá hạn')),
  FOREIGN KEY (MaDG) REFERENCES DOCGIA(MaDG),
  FOREIGN KEY (MaSach) REFERENCES SACH(MaSach)
);
    `.trim(),
    seed: `
INSERT INTO TACGIA (MaTG, TenTG, DiaChi, SoDT) VALUES
('TG01', 'Nguyễn Nhật Ánh', 'Quảng Nam', '0912345678'),
('TG02', 'Tô Hoài', 'Hà Nội', '0923456789'),
('TG03', 'Nam Cao', 'Hà Nam', '0934567890'),
('TG04', 'Ngô Tất Tố', 'Bắc Ninh', '0945678901'),
('TG05', 'J.K. Rowling', 'Vương quốc Anh', '0956789012');

INSERT INTO SACH (MaSach, TenSach, TheLoai, NamXB, MaTG) VALUES
('S01', 'Mắt biếc', 'Tiểu thuyết', 1990, 'TG01'),
('S02', 'Tôi thấy hoa vàng trên cỏ xanh', 'Truyện dài', 2010, 'TG01'),
('S03', 'Dế mèn phiêu lưu ký', 'Truyện thiếu nhi', 1941, 'TG02'),
('S04', 'Chí Phèo', 'Truyện ngắn', 1941, 'TG03'),
('S05', 'Tắt đèn', 'Tiểu thuyết hiện thực', 1939, 'TG04'),
('S06', 'Harry Potter và Hòn đá Phù thủy', 'Giả tưởng', 1997, 'TG05'),
('S07', 'Lão Hạc', 'Truyện ngắn', 1943, 'TG03'),
('S08', 'Cho tôi xin một vé đi tuổi thơ', 'Truyện dài', 2008, 'TG01');

INSERT INTO DOCGIA (MaDG, TenDG, NgaySinh, DiaChi, SoDT) VALUES
('DG01', 'Trần Bảo An', '2006-05-14', 'Hà Nội', '0981112233'),
('DG02', 'Lê Minh Tuấn', '2005-11-20', 'Đà Nẵng', '0982223344'),
('DG03', 'Phạm Quỳnh Nga', '2007-02-18', 'TP Hồ Chí Minh', '0983334455'),
('DG04', 'Nguyễn Hoàng Long', '2006-08-30', 'Hải Phòng', '0984445566'),
('DG05', 'Đỗ Thùy Linh', '2005-12-05', 'Cần Thơ', '0985556677'),
('DG06', 'Vũ Đức Thịnh', '2007-09-12', 'Hà Nội', '0986667788');

INSERT INTO MUON_TRA (MaPhieu, MaDG, MaSach, NgayMuon, NgayTra, TrangThai) VALUES
('PM01', 'DG01', 'S01', '2024-03-01', '2024-03-10', 'Đã trả'),
('PM02', 'DG01', 'S03', '2024-03-15', NULL, 'Đang mượn'),
('PM03', 'DG02', 'S02', '2024-02-20', '2024-03-05', 'Đã trả'),
('PM04', 'DG03', 'S06', '2024-03-10', NULL, 'Đang mượn'),
('PM05', 'DG04', 'S04', '2024-01-10', '2024-01-25', 'Đã trả'),
('PM06', 'DG05', 'S05', '2024-02-15', NULL, 'Quá hạn'),
('PM07', 'DG02', 'S08', '2024-03-12', NULL, 'Đang mượn'),
('PM08', 'DG03', 'S01', '2024-03-18', NULL, 'Đang mượn');
    `.trim(),
    mermaidErd: `
erDiagram
    TACGIA ||--o{ SACH : "sáng tác"
    DOCGIA ||--o{ MUON_TRA : "mượn"
    SACH ||--o{ MUON_TRA : "được mượn"
    TACGIA {
        string MaTG PK "Mã tác giả"
        string TenTG "Tên tác giả"
        string DiaChi "Địa chỉ / Quê quán"
        string SoDT "Số điện thoại"
    }
    SACH {
        string MaSach PK "Mã sách"
        string TenSach "Tên tác phẩm"
        string TheLoai "Thể loại sách"
        int NamXB "Năm xuất bản"
        string MaTG FK "Mã tác giả tham chiếu TACGIA"
    }
    DOCGIA {
        string MaDG PK "Mã độc giả"
        string TenDG "Họ và tên độc giả"
        date NgaySinh "Ngày sinh độc giả"
        string DiaChi "Địa chỉ cư trú"
        string SoDT "Số điện thoại liên hệ"
    }
    MUON_TRA {
        string MaPhieu PK "Mã phiếu mượn trả"
        string MaDG FK "Mã độc giả tham chiếu DOCGIA"
        string MaSach FK "Mã sách tham chiếu SACH"
        date NgayMuon "Ngày mượn sách"
        date NgayTra "Ngày trả sách"
        string TrangThai "Trạng thái mượn trả"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Danh sách sách kèm tên tác giả và năm xuất bản (JOIN SACH & TACGIA)',
        sql: `SELECT s.MaSach, s.TenSach, s.TheLoai, s.NamXB, tg.TenTG\nFROM SACH s\nJOIN TACGIA tg ON s.MaTG = tg.MaTG\nORDER BY s.NamXB DESC;`,
        explanation: 'Nối bảng SACH và TACGIA qua khóa ngoại MaTG để hiển thị danh mục sách cùng tên tác giả.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Nhật ký mượn trả chi tiết: Độc giả, Tên sách, Tác giả, Ngày mượn & Trạng thái',
        sql: `SELECT mt.MaPhieu, dg.TenDG, s.TenSach, tg.TenTG, mt.NgayMuon, mt.NgayTra, mt.TrangThai\nFROM MUON_TRA mt\nJOIN DOCGIA dg ON mt.MaDG = dg.MaDG\nJOIN SACH s ON mt.MaSach = s.MaSach\nJOIN TACGIA tg ON s.MaTG = tg.MaTG\nORDER BY mt.NgayMuon DESC;`,
        explanation: 'Kết hợp liên bảng qua 4 bảng để hiển thị toàn diện lịch sử các giao dịch mượn trả sách trong thư viện.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê số lần mượn sách theo từng Độc giả (LEFT JOIN & GROUP BY)',
        sql: `SELECT dg.MaDG, dg.TenDG, COUNT(mt.MaPhieu) AS SoLanMuon\nFROM DOCGIA dg\nLEFT JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG\nGROUP BY dg.MaDG, dg.TenDG\nORDER BY SoLanMuon DESC;`,
        explanation: 'Dùng LEFT JOIN để đếm số lượt mượn của tất cả độc giả, kể cả độc giả mới làm thẻ chưa mượn cuốn nào.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm các tác giả có từ 2 đầu sách trở lên trong thư viện (GROUP BY & HAVING)',
        sql: `SELECT tg.MaTG, tg.TenTG, COUNT(s.MaSach) AS SoDauSach\nFROM TACGIA tg\nJOIN SACH s ON tg.MaTG = s.MaTG\nGROUP BY tg.MaTG, tg.TenTG\nHAVING COUNT(s.MaSach) >= 2\nORDER BY SoDauSach DESC;`,
        explanation: 'Nhóm theo tác giả và dùng mệnh đề HAVING để lọc ra những tác giả có đóng góp từ 2 đầu sách trở lên trong thư viện.',
        difficulty: 'Nâng cao',
      },
      {
        title: 'Tìm các đầu sách trong kho chưa từng được ai mượn (LEFT JOIN & WHERE IS NULL)',
        sql: `SELECT s.MaSach, s.TenSach, s.TheLoai, tg.TenTG\nFROM SACH s\nJOIN TACGIA tg ON s.MaTG = tg.MaTG\nLEFT JOIN MUON_TRA mt ON s.MaSach = mt.MaSach\nWHERE mt.MaPhieu IS NULL;`,
        explanation: 'Dùng LEFT JOIN kết hợp WHERE mt.MaPhieu IS NULL để phát hiện các đầu sách chưa từng phát sinh lượt mượn nào.',
        difficulty: 'Nâng cao',
      },
    ],
  },
};
