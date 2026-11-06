import { DatabaseConfig, DatabaseId } from '../types';

export const DATABASES: Record<DatabaseId, DatabaseConfig> = {
  HOC_SINH: {
    id: 'HOC_SINH',
    name: 'CSDL_HOCSINH',
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

  CSDL_QLLUONG: {
    id: 'CSDL_QLLUONG',
    name: 'CSDL_TIENLUONG',
    subtitle: 'Danh mục đơn vị & Bảng lương nhân viên (2 Bảng)',
    description: 'Cơ sở dữ liệu quản lý tiền lương gồm 2 bảng quan hệ: DMDV (MADV, TENDV, DIACHI) và BANGLUONG (MANV, HOTEN, DIACHI, MADV, HSLUONG, NGAYCONG).',
    badge: '2 Bảng • Quản Lý Lương',
    iconClass: 'fa-solid fa-money-check-dollar',
    ddl: `
CREATE TABLE DMDV (
  MADV TEXT(2) PRIMARY KEY,
  TENDV TEXT(15) NOT NULL,
  DIACHI TEXT(40)
);

CREATE TABLE BANGLUONG (
  MANV TEXT(4) PRIMARY KEY,
  HOTEN TEXT(20) NOT NULL,
  DIACHI TEXT(30),
  MADV TEXT(2) NOT NULL,
  HSLUONG REAL NOT NULL,
  NGAYCONG INTEGER NOT NULL,
  FOREIGN KEY (MADV) REFERENCES DMDV(MADV)
);
    `.trim(),
    seed: `
INSERT INTO DMDV (MADV, TENDV, DIACHI) VALUES
('01', 'CỬA HÀNG SỐ 01', '50 HÙNG VƯƠNG'),
('02', 'CỬA HÀNG SỐ 02', '15 CMT8'),
('03', 'CÔNG TY ABC', '40 ĐOÀN TRẦN NGHIỆP'),
('04', 'XÍ NGHIỆP 204', 'ĐỒNG AN - THUẬN AN'),
('05', 'XÍ NGHIỆP GỐM', 'MINH TÂM - TXTDM');

INSERT INTO BANGLUONG (MANV, HOTEN, DIACHI, MADV, HSLUONG, NGAYCONG) VALUES
('BV01', 'TRẦN THANH HẢI', 'THỊ XÃ THỦ DẦU MỘT', '04', 4.5, 27),
('GD01', 'HỒ BÍCH NGA', 'THỊ XÃ THỦ DẦU MỘT', '02', 5.3, 27),
('KT01', 'NGUYỄN PHƯƠNG ANH', 'THUẬN AN', '01', 3.5, 17),
('KT02', 'NGUYỄN QUỐC TUẤN', 'THUẬN AN', '02', 4.0, 30),
('KT05', 'ĐÀO TIẾN', 'PHÚ GIÁO', '05', 4.2, 25),
('KT06', 'VŨ MÃO', 'PHÚ GIÁO', '05', 3.8, 20),
('NV01', 'NGUYỄN KHẮC DINH', 'TÂN UYÊN', '01', 3.5, 26),
('NV02', 'TẠ VĂN MINH', 'TÂN UYÊN', '01', 4.5, 27),
('NV03', 'BÙI THANH MAI', 'TÂN UYÊN', '03', 3.6, 24);
    `.trim(),
    mermaidErd: `
erDiagram
    DMDV ||--o{ BANGLUONG : "quản lý nhân viên"
    DMDV {
        string MADV PK "Mã đơn vị (T,2)"
        string TENDV "Tên đơn vị (T,15)"
        string DIACHI "Địa chỉ đơn vị (T,40)"
    }
    BANGLUONG {
        string MANV PK "Mã nhân viên (T,4)"
        string HOTEN "Họ và tên (T,20)"
        string DIACHI "Địa chỉ cư trú (T,30)"
        string MADV FK "Mã đơn vị tham chiếu DMDV (T,2)"
        double HSLUONG "Hệ số lương (N,double)"
        byte NGAYCONG "Số ngày công (N,byte)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Danh sách nhân viên kèm Tên đơn vị công tác, Hệ số lương và Ngày công (JOIN)',
        sql: `SELECT bl.MANV, bl.HOTEN, bl.DIACHI, dv.TENDV, bl.HSLUONG, bl.NGAYCONG\nFROM BANGLUONG bl\nJOIN DMDV dv ON bl.MADV = dv.MADV\nORDER BY bl.MADV, bl.MANV;`,
        explanation: 'Kết nối bảng BANGLUONG và DMDV qua khóa ngoại MADV để hiển thị tên đơn vị công tác của từng nhân viên.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Tính Lương thực lĩnh = HSLUONG * 1800000 * NGAYCONG / 26 cho từng nhân viên',
        sql: `SELECT bl.MANV, bl.HOTEN, dv.TENDV, bl.HSLUONG, bl.NGAYCONG, ROUND(bl.HSLUONG * 1800000 * bl.NGAYCONG / 26, 0) AS LUONG_THUC_LINH\nFROM BANGLUONG bl\nJOIN DMDV dv ON bl.MADV = dv.MADV\nORDER BY LUONG_THUC_LINH DESC;`,
        explanation: 'Sử dụng biểu thức số học tính tiền lương dựa trên Hệ số lương và Ngày công, kết hợp hàm ROUND làm tròn.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê số lượng nhân viên và hệ số lương trung bình theo từng Đơn vị (GROUP BY)',
        sql: `SELECT dv.MADV, dv.TENDV, COUNT(bl.MANV) AS SoNhanVien, ROUND(AVG(bl.HSLUONG), 2) AS HSLuong_TB, SUM(bl.NGAYCONG) AS TongNgayCong\nFROM DMDV dv\nLEFT JOIN BANGLUONG bl ON dv.MADV = bl.MADV\nGROUP BY dv.MADV, dv.TENDV\nORDER BY SoNhanVien DESC;`,
        explanation: 'Gom nhóm theo từng đơn vị để đếm quân số, tính hệ số lương trung bình và tổng ngày công.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm các nhân viên thuộc nhóm Kế toán (MANV bắt đầu bằng "KT") có NGAYCONG >= 20',
        sql: `SELECT MANV, HOTEN, DIACHI, MADV, HSLUONG, NGAYCONG\nFROM BANGLUONG\nWHERE MANV LIKE 'KT%' AND NGAYCONG >= 20;`,
        explanation: 'Sử dụng toán tử LIKE \'KT%\' để lọc nhân viên có mã bắt đầu bằng KT và kết hợp điều kiện NGAYCONG >= 20.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Tìm nhân viên có hệ số lương (HSLUONG) cao nhất trong mỗi Đơn vị (Subquery)',
        sql: `SELECT bl.MADV, dv.TENDV, bl.MANV, bl.HOTEN, bl.HSLUONG, bl.NGAYCONG\nFROM BANGLUONG bl\nJOIN DMDV dv ON bl.MADV = dv.MADV\nWHERE bl.HSLUONG = (\n  SELECT MAX(sub.HSLUONG)\n  FROM BANGLUONG sub\n  WHERE sub.MADV = bl.MADV\n)\nORDER BY bl.MADV;`,
        explanation: 'Sử dụng truy vấn con tương quan (Correlated Subquery) tìm người có hệ số lương cao nhất tại từng đơn vị.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  KINH_DOANH: {
    id: 'KINH_DOANH',
    name: 'CSDL_KINHDOANH',
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
    name: 'CSDL_HOCTAP',
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

  QL_XE: {
    id: 'QL_XE',
    name: 'CSDL_XE',
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
    name: 'CSDL_VANG',
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
    name: 'CSDL QL_CANBO',
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

  CSDL_QLDIEN: {
    id: 'CSDL_QLDIEN',
    name: 'CSDL_DIENLUC',
    subtitle: 'Khách hàng, Sử dụng & Chi tiết tiêu thụ điện (3 Bảng)',
    description: 'Cơ sở dữ liệu quản lý tiêu thụ điện gồm 3 bảng quan hệ: KHACHHANG (MAKH, TENKHACH, DIACHI), SUDUNG (MASD, LOAISD, DONGIA) và CHITIET (MASD, MAKH, SOKW, THANHTIEN).',
    badge: '3 Bảng • Quản Lý Điện',
    iconClass: 'fa-solid fa-bolt',
    ddl: `
CREATE TABLE KHACHHANG (
  MAKH TEXT(4) PRIMARY KEY,
  TENKHACH TEXT(10) NOT NULL,
  DIACHI TEXT(40)
);

CREATE TABLE SUDUNG (
  MASD TEXT(2) PRIMARY KEY,
  LOAISD TEXT(15) NOT NULL,
  DONGIA INTEGER NOT NULL
);

CREATE TABLE CHITIET (
  MASD TEXT(2) NOT NULL,
  MAKH TEXT(4) NOT NULL,
  SOKW INTEGER NOT NULL,
  THANHTIEN REAL,
  PRIMARY KEY (MASD, MAKH),
  FOREIGN KEY (MASD) REFERENCES SUDUNG(MASD),
  FOREIGN KEY (MAKH) REFERENCES KHACHHANG(MAKH)
);
    `.trim(),
    seed: `
INSERT INTO KHACHHANG (MAKH, TENKHACH, DIACHI) VALUES
('KH01', 'THANH', '12 YERSIN PHÚ CƯỜNG'),
('KH02', 'BÌNH', '04 BẠCH ĐẰNG PHÚ CƯỜNG'),
('KH03', 'HẢO', '12 DT743 PHÚ HÒA'),
('KH04', 'TIẾN', '04 ĐẠI LỘ BÌNH DƯƠNG'),
('KH05', 'HÒA', '03 DT743 PHÚ HÒA'),
('KH06', 'VÂN', '12 CMT8 PHÚ CƯỜNG');

INSERT INTO SUDUNG (MASD, LOAISD, DONGIA) VALUES
('KD', 'KINH DOANH', 750),
('SH', 'SINH HOẠT', 500),
('SX', 'SẢN XUẤT', 100);

INSERT INTO CHITIET (MASD, MAKH, SOKW, THANHTIEN) VALUES
('KD', 'KH01', 100, NULL),
('KD', 'KH02', 200, NULL),
('KD', 'KH04', 50, NULL),
('KD', 'KH05', 300, NULL),
('SH', 'KH01', 150, NULL),
('SH', 'KH02', 50, NULL),
('SH', 'KH03', 350, NULL),
('SH', 'KH04', 400, NULL),
('SH', 'KH05', 200, NULL),
('SX', 'KH01', 150, NULL),
('SX', 'KH02', 220, NULL),
('SX', 'KH03', 300, NULL);
    `.trim(),
    mermaidErd: `
erDiagram
    KHACHHANG ||--o{ CHITIET : "tiêu thụ"
    SUDUNG ||--o{ CHITIET : "áp dụng đơn giá"
    KHACHHANG {
        string MAKH PK "Mã khách hàng (T,4)"
        string TENKHACH "Tên khách hàng (T,10)"
        string DIACHI "Địa chỉ (T,40)"
    }
    SUDUNG {
        string MASD PK "Mã sử dụng (T,2)"
        string LOAISD "Loại sử dụng (T,15)"
        int DONGIA "Đơn giá điện (N,Int)"
    }
    CHITIET {
        string MASD PK,FK "Mã sử dụng (T,2)"
        string MAKH PK,FK "Mã khách hàng (T,4)"
        int SOKW "Số KW tiêu thụ (N,Int)"
        double THANHTIEN "Thành tiền (N,Double)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Chi tiết tiêu thụ điện kèm Tên khách, Loại sử dụng và tính Thành tiền (SOKW * DONGIA)',
        sql: `SELECT ct.MAKH, kh.TENKHACH, sd.LOAISD, ct.SOKW, sd.DONGIA, (ct.SOKW * sd.DONGIA) AS THANHTIEN\nFROM CHITIET ct\nJOIN KHACHHANG kh ON ct.MAKH = kh.MAKH\nJOIN SUDUNG sd ON ct.MASD = sd.MASD\nORDER BY ct.MAKH, ct.MASD;`,
        explanation: 'Kết nối 3 bảng KHACHHANG, SUDUNG, CHITIET và tính biểu thức Thành tiền = SOKW * DONGIA.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Cập nhật cột THANHTIEN = SOKW * DONGIA cho toàn bộ bảng CHITIET (UPDATE)',
        sql: `UPDATE CHITIET\nSET THANHTIEN = SOKW * (\n  SELECT DONGIA\n  FROM SUDUNG\n  WHERE SUDUNG.MASD = CHITIET.MASD\n);`,
        explanation: 'Sử dụng lệnh UPDATE kết hợp truy vấn con (Subquery) lấy DONGIA từ bảng SUDUNG để điền giá trị cho cột THANHTIEN.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê tổng số KW và tổng tiền điện theo từng Loại sử dụng (GROUP BY)',
        sql: `SELECT sd.MASD, sd.LOAISD, SUM(ct.SOKW) AS TongSoKW, SUM(ct.SOKW * sd.DONGIA) AS TongThanhTien\nFROM SUDUNG sd\nJOIN CHITIET ct ON sd.MASD = ct.MASD\nGROUP BY sd.MASD, sd.LOAISD\nORDER BY TongThanhTien DESC;`,
        explanation: 'Gom nhóm theo loại hình sử dụng điện (KINH DOANH, SINH HOẠT, SẢN XUẤT) để tính tổng sản lượng KW và doanh thu.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm khách hàng ở phường "PHÚ CƯỜNG" có sử dụng điện (LIKE)',
        sql: `SELECT MAKH, TENKHACH, DIACHI\nFROM KHACHHANG\nWHERE DIACHI LIKE '%PHÚ CƯỜNG%';`,
        explanation: 'Sử dụng toán tử LIKE với ký tự đại diện % để lọc các khách hàng có địa chỉ tại Phú Cường.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Tìm khách hàng chưa phát sinh chi tiết sử dụng điện nào (LEFT JOIN & IS NULL)',
        sql: `SELECT kh.MAKH, kh.TENKHACH, kh.DIACHI\nFROM KHACHHANG kh\nLEFT JOIN CHITIET ct ON kh.MAKH = ct.MAKH\nWHERE ct.MASD IS NULL;`,
        explanation: 'Dùng LEFT JOIN và kiểm tra ct.MASD IS NULL để tìm ra khách hàng KH06 (VÂN) chưa có dữ liệu trong bảng CHITIET.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  AM_NHAC: {
    id: 'AM_NHAC',
    name: 'CSDL_AMNHAC',
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

  QL_TV: {
    id: 'QL_TV',
    name: 'CSDL_THUVIEN',
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

  CSDL_VANTAI: {
    id: 'CSDL_VANTAI',
    name: 'CSDL_VANTAI',
    subtitle: 'Tuyến đường, Danh mục xe, Nhật trình & Chi tiết vận tải (4 Bảng)',
    description: 'Cơ sở dữ liệu quản lý vận tải hành khách gồm 4 bảng quan hệ: TUYENDUONG (MATUYEN, TENTUYEN, SOKM, GIAVE), DMXE (MAXE, TENXE, TENLAIXE, SOCHO), NHATTRINH (SONT, NGAY, MAXE) và CHITIET (SONT, MATUYEN, SOVE).',
    badge: '4 Bảng • Vận Tải',
    iconClass: 'fa-solid fa-bus',
    ddl: `
CREATE TABLE TUYENDUONG (
  MATUYEN TEXT(4) PRIMARY KEY,
  TENTUYEN TEXT(40) NOT NULL,
  SOKM INTEGER NOT NULL,
  GIAVE INTEGER NOT NULL
);

CREATE TABLE DMXE (
  MAXE TEXT(4) PRIMARY KEY,
  TENXE TEXT(10) NOT NULL,
  TENLAIXE TEXT(10) NOT NULL,
  SOCHO INTEGER NOT NULL
);

CREATE TABLE NHATTRINH (
  SONT TEXT(3) PRIMARY KEY,
  NGAY TEXT NOT NULL,
  MAXE TEXT(4) NOT NULL,
  FOREIGN KEY (MAXE) REFERENCES DMXE(MAXE)
);

CREATE TABLE CHITIET (
  SONT TEXT(3) NOT NULL,
  MATUYEN TEXT(4) NOT NULL,
  SOVE INTEGER NOT NULL,
  PRIMARY KEY (SONT, MATUYEN),
  FOREIGN KEY (SONT) REFERENCES NHATTRINH(SONT),
  FOREIGN KEY (MATUYEN) REFERENCES TUYENDUONG(MATUYEN)
);
    `.trim(),
    seed: `
INSERT INTO TUYENDUONG (MATUYEN, TENTUYEN, SOKM, GIAVE) VALUES
('BD01', 'BDƯƠNG - TPHCM', 30, 5000),
('BD02', 'BDƯƠNG - ĐỒNG NAI', 40, 6000),
('BD03', 'BDƯƠNG - LONG AN', 70, 10000),
('BD04', 'BDƯƠNG - BÌNH LONG', 80, 12000);

INSERT INTO DMXE (MAXE, TENXE, TENLAIXE, SOCHO) VALUES
('X001', '614980', 'BÌNH', 50),
('X002', '613459', 'NAM', 45),
('X003', '617820', 'HÀ', 50),
('X004', '616107', 'LINH', 30);

INSERT INTO NHATTRINH (SONT, NGAY, MAXE) VALUES
('001', '10/05/2005', 'X001'),
('002', '10/05/2005', 'X001'),
('003', '12/06/2005', 'X002'),
('004', '15/05/2005', 'X002'),
('005', '20/05/2005', 'X003');

INSERT INTO CHITIET (SONT, MATUYEN, SOVE) VALUES
('001', 'BD01', 45),
('001', 'BD02', 50),
('002', 'BD02', 45),
('002', 'BD03', 40),
('002', 'BD04', 40),
('003', 'BD01', 52),
('003', 'BD03', 45);
    `.trim(),
    mermaidErd: `
erDiagram
    DMXE ||--o{ NHATTRINH : "thực hiện chuyến"
    NHATTRINH ||--o{ CHITIET : "chi tiết nhật trình"
    TUYENDUONG ||--o{ CHITIET : "thuộc tuyến đường"
    TUYENDUONG {
        string MATUYEN PK "Mã tuyến đường (T,4)"
        string TENTUYEN "Tên tuyến đường (T,40)"
        byte SOKM "Số km (N,byte)"
        int GIAVE "Giá vé VNĐ (N,int)"
    }
    DMXE {
        string MAXE PK "Mã xe (T,4)"
        string TENXE "Biển số / Tên xe (T,10)"
        string TENLAIXE "Tên lái xe (T,10)"
        byte SOCHO "Số chỗ ngồi (N,byte)"
    }
    NHATTRINH {
        string SONT PK "Số nhật trình (T,3)"
        date NGAY "Ngày chạy (D,Short date)"
        string MAXE FK "Mã xe tham chiếu DMXE (T,4)"
    }
    CHITIET {
        string SONT PK,FK "Số nhật trình (T,3)"
        string MATUYEN PK,FK "Mã tuyến đường (T,4)"
        byte SOVE "Số vé bán được (N,byte)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Chi tiết vận tải: Số nhật trình, Ngày, Tên xe, Tên lái xe, Tên tuyến, Số vé và Thành tiền (SOVE * GIAVE)',
        sql: `SELECT ct.SONT, nt.NGAY, xe.TENXE, xe.TENLAIXE, td.TENTUYEN, ct.SOVE, td.GIAVE, (ct.SOVE * td.GIAVE) AS THANHTIEN\nFROM CHITIET ct\nJOIN NHATTRINH nt ON ct.SONT = nt.SONT\nJOIN DMXE xe ON nt.MAXE = xe.MAXE\nJOIN TUYENDUONG td ON ct.MATUYEN = td.MATUYEN\nORDER BY ct.SONT, ct.MATUYEN;`,
        explanation: 'Kết nối cả 4 bảng TUYENDUONG, DMXE, NHATTRINH, CHITIET để tổng hợp chi tiết từng chuyến xe và tính doanh thu bán vé.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê tổng số vé bán ra và tổng doanh thu theo từng Tuyến đường (GROUP BY)',
        sql: `SELECT td.MATUYEN, td.TENTUYEN, SUM(ct.SOVE) AS TongSoVe, SUM(ct.SOVE * td.GIAVE) AS TongDoanhThu\nFROM TUYENDUONG td\nJOIN CHITIET ct ON td.MATUYEN = ct.MATUYEN\nGROUP BY td.MATUYEN, td.TENTUYEN\nORDER BY TongDoanhThu DESC;`,
        explanation: 'Gom nhóm theo từng tuyến đường để tính tổng lượng hành khách (SOVE) và tổng doanh thu (SOVE * GIAVE).',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm các chuyến xe chở vượt quá số chỗ ngồi quy định (SOVE > SOCHO)',
        sql: `SELECT ct.SONT, nt.NGAY, xe.MAXE, xe.TENXE, xe.TENLAIXE, td.TENTUYEN, ct.SOVE, xe.SOCHO\nFROM CHITIET ct\nJOIN NHATTRINH nt ON ct.SONT = nt.SONT\nJOIN DMXE xe ON nt.MAXE = xe.MAXE\nJOIN TUYENDUONG td ON ct.MATUYEN = td.MATUYEN\nWHERE ct.SOVE > xe.SOCHO;`,
        explanation: 'Đối chiếu số vé bán ra (ct.SOVE) với số ghế thiết kế (xe.SOCHO) để phát hiện chuyến xe chở quá tải (SONT 003 của xe X002: 52 vé > 45 chỗ).',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê tổng số chuyến nhật trình của từng Xe (kể cả xe chưa chạy chuyến nào - LEFT JOIN)',
        sql: `SELECT xe.MAXE, xe.TENXE, xe.TENLAIXE, xe.SOCHO, COUNT(nt.SONT) AS SoChuyenNhatTrinh\nFROM DMXE xe\nLEFT JOIN NHATTRINH nt ON xe.MAXE = nt.MAXE\nGROUP BY xe.MAXE, xe.TENXE, xe.TENLAIXE, xe.SOCHO\nORDER BY SoChuyenNhatTrinh DESC;`,
        explanation: 'Sử dụng LEFT JOIN từ DMXE sang NHATTRINH để thống kê số nhật trình của tất cả các xe, phát hiện xe X004 (lái xe LINH) có 0 chuyến.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm các nhật trình chưa được cập nhật chi tiết vé bán trong bảng CHITIET (LEFT JOIN & IS NULL)',
        sql: `SELECT nt.SONT, nt.NGAY, nt.MAXE, xe.TENXE, xe.TENLAIXE\nFROM NHATTRINH nt\nJOIN DMXE xe ON nt.MAXE = xe.MAXE\nLEFT JOIN CHITIET ct ON nt.SONT = ct.SONT\nWHERE ct.MATUYEN IS NULL;`,
        explanation: 'Dùng LEFT JOIN sang CHITIET kết hợp WHERE ct.MATUYEN IS NULL để tìm ra nhật trình 004 và 005 chưa có dữ liệu chi tiết vé.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  CSDL_QLKHO: {
    id: 'CSDL_QLKHO',
    name: 'CSDL_NXKHO',
    subtitle: 'Nhập xuất kho, Danh mục kho, Hàng hóa & Chi tiết nhập xuất (4 Bảng)',
    description: 'Cơ sở dữ liệu quản lý nhập xuất kho gồm 4 bảng quan hệ: NXKHO (SOHD, NGAY, LOAIHD), DMKHO (MAKHO, TENKHO, DIACHI), DMHH (MAHH, TENHH, DONGIA) và CTNX (SOHD, MAHH, MAKHO, SOLUONG).',
    badge: '4 Bảng • Quản Lý Kho',
    iconClass: 'fa-solid fa-warehouse',
    ddl: `
CREATE TABLE NXKHO (
  SOHD TEXT(4) PRIMARY KEY,
  NGAY TEXT NOT NULL,
  LOAIHD TEXT(1) NOT NULL CHECK(LOAIHD IN ('N', 'X'))
);

CREATE TABLE DMKHO (
  MAKHO TEXT(3) PRIMARY KEY,
  TENKHO TEXT(20) NOT NULL,
  DIACHI TEXT(30)
);

CREATE TABLE DMHH (
  MAHH TEXT(4) PRIMARY KEY,
  TENHH TEXT(25) NOT NULL,
  DONGIA REAL NOT NULL
);

CREATE TABLE CTNX (
  SOHD TEXT(4) NOT NULL,
  MAHH TEXT(4) NOT NULL,
  MAKHO TEXT(3) NOT NULL,
  SOLUONG INTEGER NOT NULL,
  PRIMARY KEY (SOHD, MAHH, MAKHO),
  FOREIGN KEY (SOHD) REFERENCES NXKHO(SOHD),
  FOREIGN KEY (MAHH) REFERENCES DMHH(MAHH),
  FOREIGN KEY (MAKHO) REFERENCES DMKHO(MAKHO)
);
    `.trim(),
    seed: `
INSERT INTO NXKHO (SOHD, NGAY, LOAIHD) VALUES
('0001', '13/02/2005', 'N'),
('0002', '13/05/2005', 'X'),
('0003', '02/12/2005', 'N'),
('0004', '03/12/2005', 'X'),
('0005', '16/07/2005', 'N');

INSERT INTO DMKHO (MAKHO, TENKHO, DIACHI) VALUES
('K01', 'Công ty', 'Trụ sở Công ty'),
('K02', 'Long Bình', 'Long Bình - Đồng Nai'),
('K03', 'Phú Xuân', 'Phú Xuân - Nhà Bè'),
('K04', 'Thủ Đức', 'Chợ Nhỏ - Thủ Đức');

INSERT INTO DMHH (MAHH, TENHH, DONGIA) VALUES
('A001', 'Ấm điện Trung Quốc', 100000),
('B001', 'Bóng đèn Rạng Đông', 6000),
('B002', 'Bóng đèn Điện Quang', 8000),
('LN01', 'Lò nướng Thái Long', 120000),
('LN02', 'Lò nướng Hồng Ký', 110000),
('MS01', 'Máy sấy tóc Vĩnh Hòa', 125000),
('QD01', 'Quạt điện Bình Minh', 200000),
('QD02', 'Quạt điện Hà Nội', 220000);

INSERT INTO CTNX (SOHD, MAHH, MAKHO, SOLUONG) VALUES
('0001', 'A001', 'K02', 500),
('0001', 'QD01', 'K03', 500),
('0002', 'A001', 'K01', 200),
('0002', 'QD01', 'K02', 300),
('0002', 'QD02', 'K03', 200),
('0003', 'B001', 'K02', 2500),
('0003', 'B001', 'K03', 4000),
('0003', 'LN01', 'K04', 50),
('0003', 'QD01', 'K02', 200);
    `.trim(),
    mermaidErd: `
erDiagram
    NXKHO ||--o{ CTNX : "chứng từ nhập xuất"
    DMHH ||--o{ CTNX : "mặt hàng"
    DMKHO ||--o{ CTNX : "lưu trữ tại kho"
    NXKHO {
        string SOHD PK "Số hóa đơn (T,4)"
        date NGAY "Ngày lập (D,Short date)"
        string LOAIHD "Loại HĐ: N-Nhập / X-Xuất (T,1)"
    }
    DMKHO {
        string MAKHO PK "Mã kho (T,3)"
        string TENKHO "Tên kho (T,20)"
        string DIACHI "Địa chỉ kho (T,30)"
    }
    DMHH {
        string MAHH PK "Mã hàng hóa (T,4)"
        string TENHH "Tên hàng hóa (T,25)"
        float DONGIA "Đơn giá (N,Single)"
    }
    CTNX {
        string SOHD PK,FK "Số hóa đơn (T,4)"
        string MAHH PK,FK "Mã hàng hóa (T,4)"
        string MAKHO PK,FK "Mã kho (T,3)"
        int SOLUONG "Số lượng (N,Integer)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Chi tiết nhập xuất kho: Số HĐ, Ngày, Loại HĐ, Tên kho, Tên hàng, Số lượng & Thành tiền',
        sql: `SELECT ct.SOHD, nx.NGAY, nx.LOAIHD, k.TENKHO, hh.TENHH, ct.SOLUONG, hh.DONGIA, (ct.SOLUONG * hh.DONGIA) AS THANHTIEN\nFROM CTNX ct\nJOIN NXKHO nx ON ct.SOHD = nx.SOHD\nJOIN DMKHO k ON ct.MAKHO = k.MAKHO\nJOIN DMHH hh ON ct.MAHH = hh.MAHH\nORDER BY ct.SOHD, ct.MAKHO;`,
        explanation: 'Kết nối cả 4 bảng CTNX, NXKHO, DMKHO và DMHH để hiển thị đầy đủ thông tin chứng từ và tính cột Thành tiền = SOLUONG * DONGIA.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê tổng số lượng và tổng trị giá hàng hóa theo từng Kho (GROUP BY)',
        sql: `SELECT k.MAKHO, k.TENKHO, k.DIACHI, SUM(ct.SOLUONG) AS TongSoLuong, SUM(ct.SOLUONG * hh.DONGIA) AS TongTriGia\nFROM DMKHO k\nJOIN CTNX ct ON k.MAKHO = ct.MAKHO\nJOIN DMHH hh ON ct.MAHH = hh.MAHH\nGROUP BY k.MAKHO, k.TENKHO, k.DIACHI\nORDER BY TongTriGia DESC;`,
        explanation: 'Gom nhóm theo từng kho hàng để tính tổng khối lượng hàng lưu chuyển và tổng giá trị tiền hàng.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê tổng trị giá theo từng Loại hóa đơn: Nhập (N) và Xuất (X)',
        sql: `SELECT nx.LOAIHD, COUNT(DISTINCT nx.SOHD) AS SoHoaDon, SUM(ct.SOLUONG) AS TongSoLuong, SUM(ct.SOLUONG * hh.DONGIA) AS TongTriGia\nFROM NXKHO nx\nJOIN CTNX ct ON nx.SOHD = ct.SOHD\nJOIN DMHH hh ON ct.MAHH = hh.MAHH\nGROUP BY nx.LOAIHD;`,
        explanation: 'Phân loại theo LOAIHD (\'N\' - Nhập kho, \'X\' - Xuất kho) để so sánh tổng lượng hàng nhập và xuất.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm các mặt hàng trong bảng DMHH chưa từng phát sinh giao dịch nhập xuất nào (LEFT JOIN & IS NULL)',
        sql: `SELECT hh.MAHH, hh.TENHH, hh.DONGIA\nFROM DMHH hh\nLEFT JOIN CTNX ct ON hh.MAHH = ct.MAHH\nWHERE ct.SOHD IS NULL;`,
        explanation: 'Sử dụng LEFT JOIN từ DMHH sang CTNX kết hợp WHERE ct.SOHD IS NULL để phát hiện các mặt hàng tồn danh mục chưa từng nhập/xuất (B002, LN02, MS01).',
        difficulty: 'Nâng cao',
      },
      {
        title: 'Tìm các hóa đơn trong bảng NXKHO chưa có chi tiết hàng hóa trong bảng CTNX',
        sql: `SELECT nx.SOHD, nx.NGAY, nx.LOAIHD\nFROM NXKHO nx\nLEFT JOIN CTNX ct ON nx.SOHD = ct.SOHD\nWHERE ct.MAHH IS NULL;`,
        explanation: 'Phát hiện 2 hóa đơn 0004 và 0005 trong bảng NXKHO chưa được nhập chi tiết mặt hàng vào bảng CTNX.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  CSDL_KDSACH: {
    id: 'CSDL_KDSACH',
    name: 'CSDL_KDSACH',
    subtitle: 'Loại sách, Danh mục sách, Hóa đơn & Chi tiết hóa đơn (4 Bảng)',
    description: 'Cơ sở dữ liệu kinh doanh sách gồm 4 bảng quan hệ: LOAISACH (MALOAI, LOAISACH), DMSACH (MASACH, TENSACH, DONGIA), HOADON (SOCTU, LOAICTU, NGAYCTU, HOTEN, DIACHI) và CTHOADON (SOCTU, MASACH, MALOAI, SOLUONG).',
    badge: '4 Bảng • Kinh Doanh Sách',
    iconClass: 'fa-solid fa-book-bookmark',
    ddl: `
CREATE TABLE LOAISACH (
  MALOAI TEXT(4) PRIMARY KEY,
  LOAISACH TEXT(20) NOT NULL
);

CREATE TABLE DMSACH (
  MASACH TEXT(6) PRIMARY KEY,
  TENSACH TEXT(30) NOT NULL,
  DONGIA REAL NOT NULL
);

CREATE TABLE HOADON (
  SOCTU TEXT(3) PRIMARY KEY,
  LOAICTU TEXT(1) NOT NULL CHECK(LOAICTU IN ('N', 'X')),
  NGAYCTU TEXT NOT NULL,
  HOTEN TEXT(30) NOT NULL,
  DIACHI TEXT(15)
);

CREATE TABLE CTHOADON (
  SOCTU TEXT(3) NOT NULL,
  MASACH TEXT(6) NOT NULL,
  MALOAI TEXT(4) NOT NULL,
  SOLUONG INTEGER NOT NULL,
  PRIMARY KEY (SOCTU, MASACH, MALOAI),
  FOREIGN KEY (SOCTU) REFERENCES HOADON(SOCTU),
  FOREIGN KEY (MASACH) REFERENCES DMSACH(MASACH),
  FOREIGN KEY (MALOAI) REFERENCES LOAISACH(MALOAI)
);
    `.trim(),
    seed: `
INSERT INTO LOAISACH (MALOAI, LOAISACH) VALUES
('HH03', 'HÓA HỌC'),
('SH05', 'SINH HỌC'),
('TH01', 'TIN HỌC'),
('VH02', 'VĂN HỌC'),
('VL04', 'VẬT LÝ');

INSERT INTO DMSACH (MASACH, TENSACH, DONGIA) VALUES
('ACC001', 'LẬP TRÌNH ACCESS CƠ BẢN', 25000),
('EXC003', 'TỰ HỌC EXCEL 2002', 18500),
('HHP004', 'HÓA HỌC CĂN BẢN', 12500),
('SHC003', 'SINH HỌC CAO CẤP', 32000),
('VLC002', 'VẬT LÝ CAO CẤP', 23000),
('VLP001', 'VẬT LÝ CĂN BẢN', 17000),
('WRD002', 'LÀM QUEN VỚI MSWORD 2002', 36000);

INSERT INTO HOADON (SOCTU, LOAICTU, NGAYCTU, HOTEN, DIACHI) VALUES
('001', 'N', '06/07/2006', 'HUỲNH VĂN LŨY', 'SÀIGÒN'),
('002', 'X', '05/08/2005', 'PHAN PHONG', 'BÌNH DƯƠNG'),
('003', 'N', '01/01/2006', 'HÀ NAM ANH', 'BÌNH DƯƠNG'),
('004', 'N', '12/01/2006', 'CAO VĂN ẤN', 'ĐỒNG NAI'),
('005', 'X', '04/04/2006', 'LÊ VĂN NUÔI', 'BÌNH DƯƠNG'),
('006', 'X', '04/04/2006', 'TRIỂN CHIÊU', 'SÀI GÒN'),
('007', 'N', '07/01/2006', 'CÔNG TÔN THẮNG', 'BÌNH DƯƠNG');

INSERT INTO CTHOADON (SOCTU, MASACH, MALOAI, SOLUONG) VALUES
('001', 'ACC001', 'TH01', 5),
('001', 'SHC003', 'SH05', 15),
('001', 'WRD002', 'TH01', 3),
('002', 'EXC003', 'TH01', 12),
('002', 'VLP001', 'VL04', 20),
('003', 'EXC003', 'TH01', 10),
('005', 'ACC001', 'TH01', 10),
('005', 'WRD002', 'TH01', 25),
('007', 'EXC003', 'TH01', 7);
    `.trim(),
    mermaidErd: `
erDiagram
    HOADON ||--o{ CTHOADON : "chi tiết chứng từ"
    DMSACH ||--o{ CTHOADON : "đầu sách"
    LOAISACH ||--o{ CTHOADON : "phân loại"
    LOAISACH {
        string MALOAI PK "Mã loại sách (T,4)"
        string LOAISACH "Tên loại sách (T,20)"
    }
    DMSACH {
        string MASACH PK "Mã sách (T,6)"
        string TENSACH "Tên sách (T,30)"
        float DONGIA "Đơn giá (N,Single)"
    }
    HOADON {
        string SOCTU PK "Số chứng từ (T,3)"
        string LOAICTU "Loại chứng từ N/X (T,1)"
        date NGAYCTU "Ngày chứng từ (D,Shortdate)"
        string HOTEN "Họ tên khách hàng (T,30)"
        string DIACHI "Địa chỉ (T,15)"
    }
    CTHOADON {
        string SOCTU PK,FK "Số chứng từ (T,3)"
        string MASACH PK,FK "Mã sách (T,6)"
        string MALOAI PK,FK "Mã loại sách (T,4)"
        int SOLUONG "Số lượng (N,integer)"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Chi tiết hóa đơn: Số chứng từ, Họ tên, Tên sách, Loại sách, Số lượng, Đơn giá & Thành tiền',
        sql: `SELECT ct.SOCTU, hd.LOAICTU, hd.HOTEN, s.TENSACH, ls.LOAISACH, ct.SOLUONG, s.DONGIA, (ct.SOLUONG * s.DONGIA) AS THANHTIEN\nFROM CTHOADON ct\nJOIN HOADON hd ON ct.SOCTU = hd.SOCTU\nJOIN DMSACH s ON ct.MASACH = s.MASACH\nJOIN LOAISACH ls ON ct.MALOAI = ls.MALOAI\nORDER BY ct.SOCTU, ct.MASACH;`,
        explanation: 'Kết nối cả 4 bảng CTHOADON, HOADON, DMSACH và LOAISACH để hiển thị chi tiết từng chứng từ mua bán sách và tính Thành tiền = SOLUONG * DONGIA.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê tổng số lượng sách và tổng thành tiền theo từng Loại sách (GROUP BY)',
        sql: `SELECT ls.MALOAI, ls.LOAISACH, SUM(ct.SOLUONG) AS TongSoLuong, SUM(ct.SOLUONG * s.DONGIA) AS TongThanhTien\nFROM LOAISACH ls\nJOIN CTHOADON ct ON ls.MALOAI = ct.MALOAI\nJOIN DMSACH s ON ct.MASACH = s.MASACH\nGROUP BY ls.MALOAI, ls.LOAISACH\nORDER BY TongThanhTien DESC;`,
        explanation: 'Gom nhóm theo từng loại sách (TIN HỌC, SINH HỌC, VẬT LÝ) để thống kê tổng lượng sách lưu chuyển và doanh số.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê tổng số lượng và tổng trị giá theo từng Số chứng từ (SOCTU)',
        sql: `SELECT hd.SOCTU, hd.LOAICTU, hd.NGAYCTU, hd.HOTEN, hd.DIACHI, SUM(ct.SOLUONG) AS TongSoLuong, SUM(ct.SOLUONG * s.DONGIA) AS TongTriGia\nFROM HOADON hd\nJOIN CTHOADON ct ON hd.SOCTU = ct.SOCTU\nJOIN DMSACH s ON ct.MASACH = s.MASACH\nGROUP BY hd.SOCTU, hd.LOAICTU, hd.NGAYCTU, hd.HOTEN, hd.DIACHI\nORDER BY TongTriGia DESC;`,
        explanation: 'Tổng hợp tổng số cuốn sách và tổng tiền trên từng hóa đơn chứng từ.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Tìm các đầu sách trong bảng DMSACH chưa từng xuất hiện trong bảng CTHOADON (LEFT JOIN & IS NULL)',
        sql: `SELECT s.MASACH, s.TENSACH, s.DONGIA\nFROM DMSACH s\nLEFT JOIN CTHOADON ct ON s.MASACH = ct.MASACH\nWHERE ct.SOCTU IS NULL;`,
        explanation: 'Sử dụng LEFT JOIN từ DMSACH sang CTHOADON kết hợp WHERE ct.SOCTU IS NULL để phát hiện 2 cuốn sách chưa phát sinh giao dịch là HHP004 (HÓA HỌC CĂN BẢN) và VLC002 (VẬT LÝ CAO CẤP).',
        difficulty: 'Nâng cao',
      },
      {
        title: 'Tìm các loại sách trong bảng LOAISACH chưa có giao dịch nào trong bảng CTHOADON',
        sql: `SELECT ls.MALOAI, ls.LOAISACH\nFROM LOAISACH ls\nLEFT JOIN CTHOADON ct ON ls.MALOAI = ct.MALOAI\nWHERE ct.SOCTU IS NULL;`,
        explanation: 'Phát hiện 2 loại sách chưa có chứng từ nhập/xuất trong CTHOADON là HH03 (HÓA HỌC) và VH02 (VĂN HỌC).',
        difficulty: 'Nâng cao',
      },
    ],
  },

  CSDL_QLTAU: {
    id: 'CSDL_QLTAU',
    name: 'CSDL_TAUHANG',
    subtitle: 'Lịch trình, Tàu, Thuyền viên & Mặt hàng vận chuyển (4 Bảng)',
    description: 'Cơ sở dữ liệu quản lý vận tải đường thủy gồm 4 bảng quan hệ: TAU (MaTau, TenTau, TrongTaiToiDa), THUYENVIEN (MaThuyenVien, TenThuyenVien, ChucDanh, MucLuong), MATHANG (MaMatHang, TenMatHang, SoLuong, SoGiayPhep) và LICHTRINH (Malichtrinh, MaTau, MaThuyenVien, MaMatHang, DinhVi, CangXuatPhat, CangDen, GioKhoiHanh, GioCapBen).',
    badge: '4 Bảng • Quản Lý Tàu',
    iconClass: 'fa-solid fa-ship',
    ddl: `
CREATE TABLE TAU (
  MaTau TEXT PRIMARY KEY,
  TenTau TEXT NOT NULL,
  TrongTaiToiDa REAL NOT NULL
);

CREATE TABLE THUYENVIEN (
  MaThuyenVien TEXT PRIMARY KEY,
  TenThuyenVien TEXT NOT NULL,
  ChucDanh TEXT NOT NULL,
  MucLuong REAL NOT NULL
);

CREATE TABLE MATHANG (
  MaMatHang TEXT PRIMARY KEY,
  TenMatHang TEXT NOT NULL,
  SoLuong INTEGER NOT NULL,
  SoGiayPhep TEXT NOT NULL
);

CREATE TABLE LICHTRINH (
  Malichtrinh TEXT PRIMARY KEY,
  MaTau TEXT NOT NULL,
  MaThuyenVien TEXT NOT NULL,
  MaMatHang TEXT NOT NULL,
  DinhVi TEXT,
  CangXuatPhat TEXT NOT NULL,
  CangDen TEXT NOT NULL,
  GioKhoiHanh TEXT NOT NULL,
  GioCapBen TEXT NOT NULL,
  FOREIGN KEY (MaTau) REFERENCES TAU(MaTau),
  FOREIGN KEY (MaThuyenVien) REFERENCES THUYENVIEN(MaThuyenVien),
  FOREIGN KEY (MaMatHang) REFERENCES MATHANG(MaMatHang)
);
    `.trim(),
    seed: `
INSERT INTO TAU (MaTau, TenTau, TrongTaiToiDa) VALUES
('T01', 'Biển Đông 01', 5000),
('T02', 'Hải Âu 02', 3500),
('T03', 'Thái Bình Dương', 8000),
('T04', 'Viễn Dương 05', 6500),
('T05', 'Sóng Thần 09', 4200);

INSERT INTO THUYENVIEN (MaThuyenVien, TenThuyenVien, ChucDanh, MucLuong) VALUES
('TV01', 'Nguyễn Văn Hải', 'Thuyền trưởng', 35000000),
('TV02', 'Trần Minh Quang', 'Thuyền phó', 26000000),
('TV03', 'Lê Hoàng Nam', 'Máy trưởng', 28000000),
('TV04', 'Phạm Quốc Đạt', 'Thuyền trưởng', 38000000),
('TV05', 'Võ Thành Công', 'Thủy thủ', 16000000),
('TV06', 'Đặng Tuấn Kiệt', 'Hoa tiêu', 22000000);

INSERT INTO MATHANG (MaMatHang, TenMatHang, SoLuong, SoGiayPhep) VALUES
('MH01', 'Gạo xuất khẩu ST25', 1200, 'GP-2025-001'),
('MH02', 'Thép cuộn Hòa Phát', 2500, 'GP-2025-002'),
('MH03', 'Hạt điều Bình Phước', 800, 'GP-2025-003'),
('MH04', 'Cà phê nhân Đắk Lắk', 1500, 'GP-2025-004'),
('MH05', 'Thủy sản đông lạnh', 950, 'GP-2025-005'),
('MH06', 'Xi măng Hà Tiên', 3000, 'GP-2025-006');

INSERT INTO LICHTRINH (Malichtrinh, MaTau, MaThuyenVien, MaMatHang, DinhVi, CangXuatPhat, CangDen, GioKhoiHanh, GioCapBen) VALUES
('LT01', 'T01', 'TV01', 'MH01', '10.7769N-106.7009E', 'Cảng Cát Lái', 'Cảng Hải Phòng', '2025-03-01 06:00', '2025-03-03 18:00'),
('LT02', 'T03', 'TV04', 'MH02', '16.0544N-108.2022E', 'Cảng Hải Phòng', 'Cảng Đà Nẵng', '2025-03-02 08:00', '2025-03-03 20:00'),
('LT03', 'T02', 'TV02', 'MH03', '10.3460N-107.0843E', 'Cảng Cái Mép', 'Cảng Quy Nhơn', '2025-03-04 05:30', '2025-03-05 14:30'),
('LT04', 'T01', 'TV01', 'MH04', '13.7829N-109.2196E', 'Cảng Cát Lái', 'Cảng Đà Nẵng', '2025-03-06 07:00', '2025-03-08 11:00'),
('LT05', 'T04', 'TV03', 'MH05', '20.8449N-106.6881E', 'Cảng Cần Thơ', 'Cảng Hải Phòng', '2025-03-07 09:00', '2025-03-10 16:00'),
('LT06', 'T03', 'TV04', 'MH01', '11.9000N-109.1967E', 'Cảng Cái Mép', 'Cảng Cam Ranh', '2025-03-09 06:30', '2025-03-10 15:00'),
('LT07', 'T02', 'TV05', 'MH04', '10.7769N-106.7009E', 'Cảng Cát Lái', 'Cảng Hải Phòng', '2025-03-11 07:30', '2025-03-14 09:00');
    `.trim(),
    mermaidErd: `
erDiagram
    TAU ||--o{ LICHTRINH : "thực hiện chuyến"
    THUYENVIEN ||--o{ LICHTRINH : "phụ trách"
    MATHANG ||--o{ LICHTRINH : "vận chuyển"
    TAU {
        string MaTau PK "Mã tàu"
        string TenTau "Tên thuyền / tàu"
        float TrongTaiToiDa "Trọng tải tối đa (tấn)"
    }
    THUYENVIEN {
        string MaThuyenVien PK "Mã thuyền viên"
        string TenThuyenVien "Tên thuyền viên"
        string ChucDanh "Chức danh"
        float MucLuong "Mức lương (VNĐ)"
    }
    MATHANG {
        string MaMatHang PK "Mã mặt hàng"
        string TenMatHang "Tên mặt hàng"
        int SoLuong "Số lượng"
        string SoGiayPhep "Số giấy phép"
    }
    LICHTRINH {
        string Malichtrinh PK "Mã lịch trình"
        string MaTau FK "Mã tàu tham chiếu TAU"
        string MaThuyenVien FK "Mã thuyền viên tham chiếu THUYENVIEN"
        string MaMatHang FK "Mã mặt hàng tham chiếu MATHANG"
        string DinhVi "Tọa độ định vị"
        string CangXuatPhat "Cảng xuất phát"
        string CangDen "Cảng đến"
        datetime GioKhoiHanh "Giờ khởi hành"
        datetime GioCapBen "Giờ cập bến"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Chi tiết lịch trình vận tải: Mã lịch trình, Tên tàu, Thuyền viên, Mặt hàng, Cảng đi & Cảng đến',
        sql: `SELECT lt.Malichtrinh, t.TenTau, tv.TenThuyenVien, tv.ChucDanh, mh.TenMatHang, lt.CangXuatPhat, lt.CangDen, lt.GioKhoiHanh, lt.GioCapBen\nFROM LICHTRINH lt\nJOIN TAU t ON lt.MaTau = t.MaTau\nJOIN THUYENVIEN tv ON lt.MaThuyenVien = tv.MaThuyenVien\nJOIN MATHANG mh ON lt.MaMatHang = mh.MaMatHang\nORDER BY lt.Malichtrinh;`,
        explanation: 'Kết nối cả 4 bảng LICHTRINH, TAU, THUYENVIEN và MATHANG để hiển thị toàn bộ thông tin chi tiết của từng chuyến tàu.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê số chuyến lịch trình và tổng khối lượng hàng vận chuyển theo từng Tàu (GROUP BY)',
        sql: `SELECT t.MaTau, t.TenTau, t.TrongTaiToiDa, COUNT(lt.Malichtrinh) AS SoChuyenTau, COALESCE(SUM(mh.SoLuong), 0) AS TongSoLuongHang\nFROM TAU t\nLEFT JOIN LICHTRINH lt ON t.MaTau = lt.MaTau\nLEFT JOIN MATHANG mh ON lt.MaMatHang = mh.MaMatHang\nGROUP BY t.MaTau, t.TenTau, t.TrongTaiToiDa\nORDER BY SoChuyenTau DESC;`,
        explanation: 'Sử dụng LEFT JOIN kết hợp GROUP BY để thống kê số chuyến hành trình của từng con tàu, bao gồm cả tàu chưa khởi hành chuyến nào (T05).',
        difficulty: 'Trung bình',
      },
      {
        title: 'Thống kê số lượng thuyền viên và mức lương trung bình theo từng Chức danh (GROUP BY)',
        sql: `SELECT ChucDanh, COUNT(*) AS SoThuyenVien, ROUND(AVG(MucLuong), 0) AS LuongTrungBinh, MAX(MucLuong) AS LuongCaoNhat\nFROM THUYENVIEN\nGROUP BY ChucDanh\nORDER BY LuongTrungBinh DESC;`,
        explanation: 'Gom nhóm bảng THUYENVIEN theo ChucDanh để phân tích chế độ đãi ngộ và thu nhập bình quân.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Tìm các con tàu trong bảng TAU chưa được phân công lịch trình nào trong bảng LICHTRINH',
        sql: `SELECT t.MaTau, t.TenTau, t.TrongTaiToiDa\nFROM TAU t\nLEFT JOIN LICHTRINH lt ON t.MaTau = lt.MaTau\nWHERE lt.Malichtrinh IS NULL;`,
        explanation: 'Dùng LEFT JOIN từ TAU sang LICHTRINH kết hợp WHERE lt.Malichtrinh IS NULL để phát hiện tàu T05 (Sóng Thần 09) đang neo đậu chưa có lịch trình.',
        difficulty: 'Nâng cao',
      },
      {
        title: 'Tìm các thuyền viên chưa tham gia chuyến tàu nào và mặt hàng chưa được vận chuyển',
        sql: `SELECT tv.MaThuyenVien, tv.TenThuyenVien, tv.ChucDanh, tv.MucLuong\nFROM THUYENVIEN tv\nLEFT JOIN LICHTRINH lt ON tv.MaThuyenVien = lt.MaThuyenVien\nWHERE lt.Malichtrinh IS NULL;`,
        explanation: 'Sử dụng LEFT JOIN và kiểm tra IS NULL để tìm thuyền viên TV06 (Đặng Tuấn Kiệt - Hoa tiêu) chưa tham gia lịch trình nào.',
        difficulty: 'Nâng cao',
      },
    ],
  },

  CSDL_CUUHOA: {
    id: 'CSDL_CUUHOA',
    name: 'CSDL_CUUHOA',
    subtitle: 'Trụ nước, Xe chữa cháy, Vụ cháy & Điều động xe (4 Bảng)',
    description: 'Cơ sở dữ liệu quản lý phòng cháy chữa cháy (PCCC) gồm 4 bảng: TRU_NUOC (MaTru, ViTri, ApLucChuan), XE_CHUA_CHAY (MaXe, BienSo, DungTichNuoc), VU_CHAY (MaVu, DiaDiem, ThoiGianBao) và DIEU_DONG_XE (MaDieuDong, MaVu, MaXe, GioXuatPhat).',
    badge: '4 Bảng • Cứu Hỏa PCCC',
    iconClass: 'fa-solid fa-fire-extinguisher',
    ddl: `
CREATE TABLE TRU_NUOC (
  MaTru TEXT PRIMARY KEY,
  ViTri TEXT NOT NULL,
  ApLucChuan REAL NOT NULL
);

CREATE TABLE XE_CHUA_CHAY (
  MaXe TEXT PRIMARY KEY,
  BienSo TEXT NOT NULL,
  DungTichNuoc INTEGER NOT NULL
);

CREATE TABLE VU_CHAY (
  MaVu TEXT PRIMARY KEY,
  DiaDiem TEXT NOT NULL,
  ThoiGianBao TEXT NOT NULL
);

CREATE TABLE DIEU_DONG_XE (
  MaDieuDong TEXT PRIMARY KEY,
  MaVu TEXT NOT NULL,
  MaXe TEXT NOT NULL,
  GioXuatPhat TEXT NOT NULL,
  FOREIGN KEY (MaVu) REFERENCES VU_CHAY(MaVu),
  FOREIGN KEY (MaXe) REFERENCES XE_CHUA_CHAY(MaXe)
);
    `.trim(),
    seed: `
INSERT INTO TRU_NUOC (MaTru, ViTri, ApLucChuan) VALUES
('TN01', 'Ngã tư Hàng Xanh - Quận Bình Thạnh', 4.5),
('TN02', 'Chợ Bến Thành - Quận 1', 5.0),
('TN03', 'Khu công nghiệp Sóng Thần - Bình Dương', 6.0),
('TN04', 'Khu đô thị Phú Mỹ Hưng - Quận 7', 4.8),
('TN05', 'Bến xe Miền Đông mới - TP Thủ Đức', 5.5),
('TN06', 'Chợ Lớn - Quận 5', 3.8);

INSERT INTO XE_CHUA_CHAY (MaXe, BienSo, DungTichNuoc) VALUES
('XCC01', '51A-114.01', 4000),
('XCC02', '51A-114.02', 6000),
('XCC03', '61A-114.05', 8000),
('XCC04', '51A-114.08', 5000),
('XCC05', '51A-114.12', 10000),
('XCC06', '61A-114.15', 3500);

INSERT INTO VU_CHAY (MaVu, DiaDiem, ThoiGianBao) VALUES
('VC01', 'Kho xưởng Khu công nghiệp Sóng Thần - Bình Dương', '2025-02-10 14:15'),
('VC02', 'Chung cư mini đường Điện Biên Phủ - Quận Bình Thạnh', '2025-02-15 09:30'),
('VC03', 'Cửa hàng tạp hóa gần Chợ Bến Thành - Quận 1', '2025-02-20 19:45'),
('VC04', 'Bãi phế liệu TP Thủ Đức', '2025-03-01 11:10'),
('VC05', 'Nhà kho Quận 7', '2025-03-05 16:20');

INSERT INTO DIEU_DONG_XE (MaDieuDong, MaVu, MaXe, GioXuatPhat) VALUES
('DD01', 'VC01', 'XCC03', '2025-02-10 14:18'),
('DD02', 'VC01', 'XCC05', '2025-02-10 14:20'),
('DD03', 'VC01', 'XCC02', '2025-02-10 14:22'),
('DD04', 'VC02', 'XCC01', '2025-02-15 09:33'),
('DD05', 'VC02', 'XCC04', '2025-02-15 09:35'),
('DD06', 'VC03', 'XCC01', '2025-02-20 19:48'),
('DD07', 'VC04', 'XCC02', '2025-03-01 11:14'),
('DD08', 'VC04', 'XCC05', '2025-03-01 11:15');
    `.trim(),
    mermaidErd: `
erDiagram
    VU_CHAY ||--o{ DIEU_DONG_XE : "điều động xử lý"
    XE_CHUA_CHAY ||--o{ DIEU_DONG_XE : "được điều động"
    TRU_NUOC {
        string MaTru PK "Mã trụ nước"
        string ViTri "Vị trí đặt trụ nước"
        float ApLucChuan "Áp lực nước chuẩn (bar)"
    }
    XE_CHUA_CHAY {
        string MaXe PK "Mã xe chữa cháy"
        string BienSo "Biển số xe"
        int DungTichNuoc "Dung tích bồn nước (lít)"
    }
    VU_CHAY {
        string MaVu PK "Mã vụ cháy"
        string DiaDiem "Địa điểm xảy ra cháy"
        datetime ThoiGianBao "Thời gian nhận tin báo"
    }
    DIEU_DONG_XE {
        string MaDieuDong PK "Mã lệnh điều động"
        string MaVu FK "Mã vụ cháy tham chiếu VU_CHAY"
        string MaXe FK "Mã xe tham chiếu XE_CHUA_CHAY"
        datetime GioXuatPhat "Giờ xe xuất phát"
    }
    `.trim(),
    sampleQueries: [
      {
        title: 'Chi tiết điều động xe chữa cháy: Mã điều động, Địa điểm cháy, Thời gian báo, Biển số xe, Dung tích nước & Giờ xuất phát',
        sql: `SELECT dd.MaDieuDong, vc.MaVu, vc.DiaDiem, vc.ThoiGianBao, xe.MaXe, xe.BienSo, xe.DungTichNuoc, dd.GioXuatPhat\nFROM DIEU_DONG_XE dd\nJOIN VU_CHAY vc ON dd.MaVu = vc.MaVu\nJOIN XE_CHUA_CHAY xe ON dd.MaXe = xe.MaXe\nORDER BY dd.MaDieuDong;`,
        explanation: 'Kết nối 3 bảng DIEU_DONG_XE, VU_CHAY và XE_CHUA_CHAY để theo dõi chi tiết từng lệnh điều động phương tiện ứng cứu.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Thống kê số lượng xe điều động và tổng dung tích nước huy động cho từng Vụ cháy (GROUP BY)',
        sql: `SELECT vc.MaVu, vc.DiaDiem, COUNT(dd.MaDieuDong) AS SoXeDieuDong, COALESCE(SUM(xe.DungTichNuoc), 0) AS TongDungTichNuoc\nFROM VU_CHAY vc\nLEFT JOIN DIEU_DONG_XE dd ON vc.MaVu = dd.MaVu\nLEFT JOIN XE_CHUA_CHAY xe ON dd.MaXe = xe.MaXe\nGROUP BY vc.MaVu, vc.DiaDiem\nORDER BY TongDungTichNuoc DESC;`,
        explanation: 'Sử dụng LEFT JOIN và GROUP BY để tính tổng số xe và tổng lượng nước (lít) huy động cho mỗi vụ cháy.',
        difficulty: 'Trung bình',
      },
      {
        title: 'Liệt kê các trụ nước cứu hỏa có áp lực chuẩn từ 5.0 bar trở lên',
        sql: `SELECT MaTru, ViTri, ApLucChuan\nFROM TRU_NUOC\nWHERE ApLucChuan >= 5.0\nORDER BY ApLucChuan DESC;`,
        explanation: 'Lọc các trụ nước áp lực cao từ bảng TRU_NUOC phục vụ tiếp nước nhanh cho xe chữa cháy.',
        difficulty: 'Cơ bản',
      },
      {
        title: 'Tìm các xe chữa cháy trong bảng XE_CHUA_CHAY chưa từng được điều động lần nào (LEFT JOIN & IS NULL)',
        sql: `SELECT xe.MaXe, xe.BienSo, xe.DungTichNuoc\nFROM XE_CHUA_CHAY xe\nLEFT JOIN DIEU_DONG_XE dd ON xe.MaXe = dd.MaXe\nWHERE dd.MaDieuDong IS NULL;`,
        explanation: 'Sử dụng LEFT JOIN kết hợp WHERE dd.MaDieuDong IS NULL để tìm xe dự phòng XCC06 (61A-114.15) chưa phát sinh lệnh điều động.',
        difficulty: 'Nâng cao',
      },
      {
        title: 'Tìm các vụ cháy huy động tổng dung tích nước từ 15.000 lít trở lên (GROUP BY & HAVING)',
        sql: `SELECT vc.MaVu, vc.DiaDiem, COUNT(dd.MaXe) AS SoXe, SUM(xe.DungTichNuoc) AS TongNuoc\nFROM VU_CHAY vc\nJOIN DIEU_DONG_XE dd ON vc.MaVu = dd.MaVu\nJOIN XE_CHUA_CHAY xe ON dd.MaXe = xe.MaXe\nGROUP BY vc.MaVu, vc.DiaDiem\nHAVING SUM(xe.DungTichNuoc) >= 15000\nORDER BY TongNuoc DESC;`,
        explanation: 'Sử dụng mệnh đề HAVING SUM(xe.DungTichNuoc) >= 15000 để lọc ra các vụ cháy lớn cần huy động lượng nước từ 15.000 lít trở lên (VC01 và VC04).',
        difficulty: 'Nâng cao',
      },
    ],
  },
};
