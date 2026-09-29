import { DatabaseId, QuizQuestion } from '../types';

export const QUIZZES_BY_DATABASE: Record<DatabaseId, QuizQuestion[]> = {
  // ==========================================
  // 1. CSDL HỌC SINH (1 Bảng - Điểm & Hồ Sơ)
  // ==========================================
  HOC_SINH: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'HS-Q01',
      databaseId: 'HOC_SINH',
      level: 'Nhận biết',
      order: 1,
      question: 'Cú pháp SQL chuẩn nào được dùng để trích xuất toàn bộ dữ liệu (tất cả các cột và các dòng) từ bảng HOC_SINH?',
      options: [
        { key: 'A', text: 'SELECT ALL FROM HOC_SINH;' },
        { key: 'B', text: 'SELECT * FROM HOC_SINH;' },
        { key: 'C', text: 'GET * FROM HOC_SINH;' },
        { key: 'D', text: 'EXTRACT ALL HOC_SINH;' },
      ],
      correctAnswer: 'B',
      explanation: 'Ký tự đại diện dấu sao (*) trong mệnh đề SELECT đại diện cho toàn bộ các cột trong bảng được chỉ định sau FROM.',
      relatedSql: 'SELECT *\nFROM HOC_SINH;',
    },
    {
      id: 'HS-Q02',
      databaseId: 'HOC_SINH',
      level: 'Nhận biết',
      order: 2,
      question: 'Trong bảng HOC_SINH, cột MaSo được gán ràng buộc "PRIMARY KEY AUTOINCREMENT". Ý nghĩa của ràng buộc này là gì?',
      options: [
        { key: 'A', text: 'Là cột cho phép chứa giá trị trùng nhau và có thể để trống (NULL).' },
        { key: 'B', text: 'Là khóa chính định danh duy nhất mỗi học sinh, tự động tăng giá trị số nguyên khi thêm học sinh mới và không được để trống.' },
        { key: 'C', text: 'Là khóa ngoại tham chiếu đến bảng lớp học bên ngoài.' },
        { key: 'D', text: 'Tự động tính điểm trung bình khi học sinh có điểm môn Toán và Văn.' },
      ],
      correctAnswer: 'B',
      explanation: 'PRIMARY KEY xác định trường khóa chính duy nhất không trùng lặp và không NULL; AUTOINCREMENT tự động tăng giá trị số nguyên cho mỗi bản ghi mới chèn vào.',
      relatedSql: 'SELECT MaSo, HoDem, Ten\nFROM HOC_SINH\nORDER BY MaSo ASC;',
    },
    {
      id: 'HS-Q03',
      databaseId: 'HOC_SINH',
      level: 'Nhận biết',
      order: 3,
      question: 'Mệnh đề nào trong câu lệnh SQL được sử dụng để sắp xếp thứ tự các bản ghi kết quả trả về theo một hoặc nhiều cột?',
      options: [
        { key: 'A', text: 'GROUP BY' },
        { key: 'B', text: 'ORDER BY' },
        { key: 'C', text: 'SORT BY' },
        { key: 'D', text: 'ARRANGE BY' },
      ],
      correctAnswer: 'B',
      explanation: 'Mệnh đề ORDER BY dùng để sắp xếp kết quả tăng dần (ASC - mặc định) hoặc giảm dần (DESC).',
      relatedSql: 'SELECT MaSo, Ten, Toan\nFROM HOC_SINH\nORDER BY Toan DESC;',
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'HS-Q04',
      databaseId: 'HOC_SINH',
      level: 'Thông hiểu',
      order: 4,
      question: 'Quan sát câu lệnh SQL sau:\nSELECT COUNT(*) AS So_Luong\nFROM HOC_SINH\nWHERE GT = \'Nữ\';\nKết quả trả về sẽ là bao nhiêu bản ghi nữ dựa trên dữ liệu hiện có của bảng HOC_SINH?',
      sqlSnippet: `SELECT COUNT(*) AS So_Luong\nFROM HOC_SINH\nWHERE GT = 'Nữ';`,
      options: [
        { key: 'A', text: '3 học sinh' },
        { key: 'B', text: '4 học sinh (Mai, Hà, Nga, Vy)' },
        { key: 'C', text: '5 học sinh' },
        { key: 'D', text: '8 học sinh' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong dữ liệu mẫu có 8 học sinh: 4 Nam (Hoàng, Tuấn, Nam, Khánh) và 4 Nữ (Mai, Hà, Nga, Vy). Hàm COUNT(*) với điều kiện GT = \'Nữ\' sẽ trả về kết quả là 4.',
      relatedSql: `SELECT COUNT(*) AS So_Luong_Nu\nFROM HOC_SINH\nWHERE GT = 'Nữ';`,
    },
    {
      id: 'HS-Q05',
      databaseId: 'HOC_SINH',
      level: 'Thông hiểu',
      order: 5,
      question: 'Điều kiện lọc sau đây trong mệnh đề WHERE có ý nghĩa gì?\nWHERE Toan >= 8.0 AND Van >= 8.0',
      sqlSnippet: `SELECT MaSo, HoDem, Ten, Toan, Van\nFROM HOC_SINH\nWHERE Toan >= 8.0 AND Van >= 8.0;`,
      options: [
        { key: 'A', text: 'Lọc những học sinh có điểm môn Toán hoặc môn Văn đạt từ 8.0 trở lên.' },
        { key: 'B', text: 'Lọc những học sinh có cả hai điểm môn Toán và Văn đồng thời phải đạt từ 8.0 trở lên.' },
        { key: 'C', text: 'Lọc những học sinh có điểm trung bình cộng hai môn lớn hơn hoặc bằng 8.0.' },
        { key: 'D', text: 'Lọc những học sinh có tổng điểm hai môn đạt 16.0 điểm.' },
      ],
      correctAnswer: 'B',
      explanation: 'Toán tử logic AND đòi hỏi cả hai vế điều kiện (Toan >= 8.0 và Van >= 8.0) phải cùng đúng đồng thời trên từng bản ghi.',
      relatedSql: `SELECT MaSo, HoDem || ' ' || Ten AS HoTen, Toan, Van\nFROM HOC_SINH\nWHERE Toan >= 8.0 AND Van >= 8.0;`,
    },
    {
      id: 'HS-Q06',
      databaseId: 'HOC_SINH',
      level: 'Thông hiểu',
      order: 6,
      question: 'Cho câu lệnh SQL:\nSELECT DISTINCT To_hoc FROM HOC_SINH;\nKết quả câu lệnh này trả về điều gì?',
      sqlSnippet: `SELECT DISTINCT To_hoc\nFROM HOC_SINH;`,
      options: [
        { key: 'A', text: 'Tổng số lượng học sinh trong mỗi tổ học tập.' },
        { key: 'B', text: 'Danh sách các tổ học tập duy nhất không bị trùng lặp (gồm các giá trị: 1, 2, 3).' },
        { key: 'C', text: 'Danh sách tất cả 8 dòng giá trị tổ của 8 học sinh.' },
        { key: 'D', text: 'Báo lỗi cú pháp vì DISTINCT bắt buộc phải đi kèm với hàm gộp COUNT().' },
      ],
      correctAnswer: 'B',
      explanation: 'Từ khóa DISTINCT loại bỏ các giá trị lặp lại trong cột To_hoc, chỉ giữ lại tập các giá trị phân biệt duy nhất (1, 2, 3).',
      relatedSql: `SELECT DISTINCT To_hoc\nFROM HOC_SINH;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'HS-Q07',
      databaseId: 'HOC_SINH',
      level: 'Vận dụng',
      order: 7,
      question: 'Để tính điểm trung bình môn Toán và điểm trung bình môn Văn theo từng Tổ học tập (To_hoc), câu lệnh SQL nào sau đây là chuẩn xác nhất?',
      options: [
        { key: 'A', text: 'SELECT To_hoc, ROUND(AVG(Toan), 2) AS DTB_Toan, ROUND(AVG(Van), 2) AS DTB_Van FROM HOC_SINH GROUP BY To_hoc;' },
        { key: 'B', text: 'SELECT To_hoc, SUM(Toan) / COUNT(Toan) FROM HOC_SINH ORDER BY To_hoc;' },
        { key: 'C', text: 'SELECT To_hoc, AVG(Toan, Van) FROM HOC_SINH;' },
        { key: 'D', text: 'SELECT To_hoc, MEAN(Toan), MEAN(Van) FROM HOC_SINH GROUP BY Toan;' },
      ],
      correctAnswer: 'A',
      explanation: 'Để thống kê theo từng nhóm, cần dùng GROUP BY To_hoc kết hợp các hàm gộp AVG(Toan) và AVG(Van), bọc ROUND(..., 2) để làm tròn số thập phân.',
      relatedSql: `SELECT To_hoc, COUNT(*) AS SiSo, ROUND(AVG(Toan), 2) AS DTB_Toan, ROUND(AVG(Van), 2) AS DTB_Van\nFROM HOC_SINH\nGROUP BY To_hoc;`,
    },
    {
      id: 'HS-Q08',
      databaseId: 'HOC_SINH',
      level: 'Vận dụng',
      order: 8,
      question: 'Cần tìm học sinh Nữ có điểm môn Toán cao nhất trong bảng HOC_SINH. Câu lệnh SQL nào dưới đây cho kết quả chính xác và ngắn gọn nhất?',
      options: [
        { key: 'A', text: 'SELECT MaSo, HoDem || \' \' || Ten AS HoTen, Toan FROM HOC_SINH WHERE GT = \'Nữ\' ORDER BY Toan DESC LIMIT 1;' },
        { key: 'B', text: 'SELECT MaSo, Ten, MAX(Toan) FROM HOC_SINH WHERE GT = \'Nữ\';' },
        { key: 'C', text: 'SELECT * FROM HOC_SINH WHERE Toan = MAX(Toan) AND GT = \'Nữ\';' },
        { key: 'D', text: 'SELECT Ten FROM HOC_SINH GROUP BY GT HAVING MAX(Toan);' },
      ],
      correctAnswer: 'A',
      explanation: 'Lọc điều kiện GT = \'Nữ\', sắp xếp điểm Toán giảm dần (ORDER BY Toan DESC) và lấy bản ghi đầu tiên bằng LIMIT 1 để được học sinh nữ có điểm Toán cao nhất (bạn Đỗ Quỳnh Nga, 9.5 điểm).',
      relatedSql: `SELECT MaSo, HoDem || ' ' || Ten AS HoTen, GT, Toan\nFROM HOC_SINH\nWHERE GT = 'Nữ'\nORDER BY Toan DESC\nLIMIT 1;`,
    },
    {
      id: 'HS-Q09',
      databaseId: 'HOC_SINH',
      level: 'Vận dụng',
      order: 9,
      question: 'Muốn cập nhật tăng thêm 0.5 điểm môn Văn cho tất cả học sinh thuộc Tổ 2 có điểm Văn dưới 8.0, câu lệnh SQL nào dưới đây là đúng?',
      options: [
        { key: 'A', text: 'UPDATE HOC_SINH SET Van = Van + 0.5 WHERE To_hoc = 2 AND Van < 8.0;' },
        { key: 'B', text: 'MODIFY HOC_SINH SET Van = Van + 0.5 WHERE To_hoc = 2 AND Van < 8.0;' },
        { key: 'C', text: 'ALTER TABLE HOC_SINH UPDATE Van = Van + 0.5 WHERE To_hoc = 2;' },
        { key: 'D', text: 'UPDATE TABLE HOC_SINH SET Van = Van + 0.5 HAVING To_hoc = 2;' },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp DML cập nhật dữ liệu chuẩn là: UPDATE tên_bảng SET cột = biểu_thức WHERE điều_kiện.',
      relatedSql: `UPDATE HOC_SINH\nSET Van = Van + 0.5\nWHERE To_hoc = 2 AND Van < 8.0;`,
    },
    {
      id: 'HS-Q10',
      databaseId: 'HOC_SINH',
      level: 'Vận dụng',
      order: 10,
      question: 'Để lọc ra các Tổ học tập có điểm trung bình môn Toán lớn hơn hoặc bằng 8.0, câu lệnh SQL nào sau đây sử dụng đúng cú pháp mệnh đề HAVING?',
      options: [
        { key: 'A', text: 'SELECT To_hoc, AVG(Toan) AS DTB FROM HOC_SINH WHERE AVG(Toan) >= 8.0 GROUP BY To_hoc;' },
        { key: 'B', text: 'SELECT To_hoc, ROUND(AVG(Toan), 2) AS DTB_Toan FROM HOC_SINH GROUP BY To_hoc HAVING AVG(Toan) >= 8.0;' },
        { key: 'C', text: 'SELECT To_hoc, AVG(Toan) AS DTB FROM HOC_SINH GROUP BY To_hoc WHERE Toan >= 8.0;' },
        { key: 'D', text: 'SELECT To_hoc FROM HOC_SINH HAVING Toan >= 8.0 GROUP BY To_hoc;' },
      ],
      correctAnswer: 'B',
      explanation: 'Mệnh đề WHERE lọc từng bản ghi trước khi gom nhóm và không thể chứa hàm gộp (như AVG). Muốn lọc theo kết quả của hàm gộp sau khi nhóm, bắt buộc phải dùng mệnh đề HAVING AVG(Toan) >= 8.0 sau GROUP BY.',
      relatedSql: `SELECT To_hoc, ROUND(AVG(Toan), 2) AS DTB_Toan\nFROM HOC_SINH\nGROUP BY To_hoc\nHAVING AVG(Toan) >= 8.0;`,
    },
  ],

  // ==========================================
  // 2. CSDL KINH DOANH (3 Bảng - Bán Hàng)
  // ==========================================
  KINH_DOANH: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'KD-Q01',
      databaseId: 'KINH_DOANH',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong bảng HOA_DON, hai cột Ma_khach_hang và Ma_mat_hang mang ràng buộc FOREIGN KEY có vai trò chính là gì?',
      options: [
        { key: 'A', text: 'Tự động tính thành tiền của hóa đơn khi nhân số lượng với đơn giá.' },
        { key: 'B', text: 'Thiết lập mối quan hệ tham chiếu đến khóa chính của bảng KHACH_HANG và MAT_HANG, đảm bảo tính toàn vẹn dữ liệu.' },
        { key: 'C', text: 'Ngăn chặn việc chỉnh sửa số lượng sản phẩm sau khi đã lập hóa đơn.' },
        { key: 'D', text: 'Đánh số thứ tự tăng dần tự động cho các hóa đơn.' },
      ],
      correctAnswer: 'B',
      explanation: 'Khóa ngoại (Foreign Key) tạo mối liên kết tham chiếu giữa bảng con (HOA_DON) và các bảng cha (KHACH_HANG, MAT_HANG), bảo đảm không tồn tại hóa đơn với mã khách hoặc mã hàng không có thật.',
      relatedSql: `SELECT hd.So_don, hd.Ma_khach_hang, hd.Ma_mat_hang\nFROM HOA_DON hd;`,
    },
    {
      id: 'KD-Q02',
      databaseId: 'KINH_DOANH',
      level: 'Nhận biết',
      order: 2,
      question: 'Cú pháp SQL nào sau đây được sử dụng để chèn thêm một bản ghi khách hàng mới vào bảng KHACH_HANG?',
      options: [
        { key: 'A', text: 'ADD INTO KHACH_HANG VALUES (\'KH06\', \'Trần Văn Nam\', \'Hải Dương\');' },
        { key: 'B', text: 'INSERT INTO KHACH_HANG (Ma_khach_hang, Ho_ten, Dia_chi) VALUES (\'KH06\', \'Trần Văn Nam\', \'Hải Dương\');' },
        { key: 'C', text: 'CREATE ROW KHACH_HANG (\'KH06\', \'Trần Văn Nam\', \'Hải Dương\');' },
        { key: 'D', text: 'UPDATE KHACH_HANG INSERT (\'KH06\', \'Trần Văn Nam\', \'Hải Dương\');' },
      ],
      correctAnswer: 'B',
      explanation: 'Cú pháp chuẩn để thêm bản ghi mới trong SQL là: INSERT INTO tên_bảng (các_cột) VALUES (các_giá_trị);.',
      relatedSql: `INSERT INTO KHACH_HANG (Ma_khach_hang, Ho_ten, Dia_chi)\nVALUES ('KH06', 'Trần Văn Nam', 'Hải Dương');`,
    },
    {
      id: 'KD-Q03',
      databaseId: 'KINH_DOANH',
      level: 'Nhận biết',
      order: 3,
      question: 'Cột So_luong trong bảng HOA_DON có ràng buộc CHECK(So_luong > 0). Ràng buộc này có ý nghĩa gì?',
      options: [
        { key: 'A', text: 'Số lượng mua hàng bắt buộc phải là số nguyên dương lớn hơn 0, không chấp nhận số âm hay số 0.' },
        { key: 'B', text: 'Số lượng mua hàng luôn được làm tròn thành số 1.' },
        { key: 'C', text: 'Số lượng mua hàng tối đa là 100 sản phẩm.' },
        { key: 'D', text: 'Tự động trừ số lượng hàng tồn kho.' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề CHECK(So_luong > 0) là ràng buộc miền giá trị kiểm tra dữ liệu trước khi lưu, từ chối bất kỳ giá trị nào nhỏ hơn hoặc bằng 0.',
      relatedSql: `SELECT So_don, So_luong\nFROM HOA_DON\nWHERE So_luong > 0;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'KD-Q04',
      databaseId: 'KINH_DOANH',
      level: 'Thông hiểu',
      order: 4,
      question: 'Trong câu lệnh kết nối hai bảng sau:\nSELECT hd.So_don, kh.Ho_ten\nFROM HOA_DON hd JOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang;\nĐiều kiện trong mệnh đề ON có vai trò gì?',
      sqlSnippet: `SELECT hd.So_don, kh.Ho_ten\nFROM HOA_DON hd JOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang;`,
      options: [
        { key: 'A', text: 'Chỉ định tiêu chí kết nối: chỉ ghép các bản ghi khi mã khách hàng ở bảng HOA_DON trùng khớp với mã khách hàng ở bảng KHACH_HANG.' },
        { key: 'B', text: 'Nhân tất cả các dòng của bảng này với tất cả các dòng của bảng kia.' },
        { key: 'C', text: 'Sắp xếp danh sách hóa đơn theo tên của khách hàng.' },
        { key: 'D', text: 'Xóa đi các khách hàng chưa có hóa đơn mua hàng.' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ON chỉ rõ biểu thức điều kiện kết nối (Join condition) để ghép cặp chính xác dòng dữ liệu tương ứng giữa hai quan hệ.',
      relatedSql: `SELECT hd.So_don, kh.Ho_ten, hd.Ngay_giao_hang\nFROM HOA_DON hd\nJOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang;`,
    },
    {
      id: 'KD-Q05',
      databaseId: 'KINH_DOANH',
      level: 'Thông hiểu',
      order: 5,
      question: 'Cho câu lệnh SQL:\nSELECT COUNT(DISTINCT Ma_khach_hang) AS So_Khach_Mua\nFROM HOA_DON;\nÝ nghĩa nghiệp vụ thực tế của câu lệnh trên là gì?',
      sqlSnippet: `SELECT COUNT(DISTINCT Ma_khach_hang) AS So_Khach_Mua\nFROM HOA_DON;`,
      options: [
        { key: 'A', text: 'Đếm tổng số đơn hàng đã được giao dịch.' },
        { key: 'B', text: 'Đếm số lượng khách hàng phân biệt đã từng phát sinh ít nhất một giao dịch mua hàng.' },
        { key: 'C', text: 'Đếm tổng số lượng tất cả các sản phẩm đã bán ra.' },
        { key: 'D', text: 'Đếm số lượng khách hàng chưa mua hàng lần nào.' },
      ],
      correctAnswer: 'B',
      explanation: 'Một khách hàng có thể mua nhiều đơn hàng (mã khách lặp lại trong HOA_DON). Từ khóa DISTINCT loại bỏ sự trùng lặp trước khi COUNT, cho biết có bao nhiêu khách hàng riêng biệt đã mua.',
      relatedSql: `SELECT COUNT(DISTINCT Ma_khach_hang) AS So_Khach_Mua\nFROM HOA_DON;`,
    },
    {
      id: 'KD-Q06',
      databaseId: 'KINH_DOANH',
      level: 'Thông hiểu',
      order: 6,
      question: 'Câu lệnh: SELECT * FROM MAT_HANG WHERE Don_gia BETWEEN 70000 AND 130000; sẽ trả về những mặt hàng có đơn giá thỏa mãn điều kiện nào?',
      sqlSnippet: `SELECT * FROM MAT_HANG\nWHERE Don_gia BETWEEN 70000 AND 130000;`,
      options: [
        { key: 'A', text: 'Đơn giá lớn hơn 70.000 và nhỏ hơn 130.000 (không lấy giá trị 70.000 và 130.000).' },
        { key: 'B', text: 'Đơn giá nằm trong đoạn từ 70.000 đến 130.000 (bao gồm cả giá trị 70.000 và 130.000).' },
        { key: 'C', text: 'Đơn giá chỉ bằng đúng 70.000 hoặc 130.000.' },
        { key: 'D', text: 'Đơn giá nhỏ hơn 70.000 hoặc lớn hơn 130.000.' },
      ],
      correctAnswer: 'B',
      explanation: 'Toán tử BETWEEN x AND y trong SQL luôn tính đoạn đóng [x, y], tức là tương đương với: Don_gia >= 70000 AND Don_gia <= 130000.',
      relatedSql: `SELECT Ma_mat_hang, Ten_mat_hang, Don_gia\nFROM MAT_HANG\nWHERE Don_gia BETWEEN 70000 AND 130000;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'KD-Q07',
      databaseId: 'KINH_DOANH',
      level: 'Vận dụng',
      order: 7,
      question: 'Để xem chi tiết danh sách hóa đơn gồm: Số đơn, Tên khách hàng, Tên mặt hàng, Số lượng mua, Đơn giá và Thành tiền (Thành tiền = Số lượng * Đơn giá), câu lệnh SQL nào sau đây là chính xác?',
      options: [
        { key: 'A', text: `SELECT hd.So_don, kh.Ho_ten, mh.Ten_mat_hang, hd.So_luong, mh.Don_gia, (hd.So_luong * mh.Don_gia) AS Thanh_tien\nFROM HOA_DON hd\nJOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang;` },
        { key: 'B', text: `SELECT hd.So_don, kh.Ho_ten, mh.Ten_mat_hang, hd.So_luong * mh.Don_gia\nFROM HOA_DON hd, KHACH_HANG kh, MAT_HANG mh;` },
        { key: 'C', text: `SELECT hd.So_don, (hd.So_luong * mh.Don_gia) AS Thanh_tien\nFROM HOA_DON hd;` },
        { key: 'D', text: `SELECT hd.So_don, MULTIPLY(hd.So_luong, mh.Don_gia) FROM HOA_DON hd JOIN MAT_HANG mh;` },
      ],
      correctAnswer: 'A',
      explanation: 'Cần kết nối 3 bảng qua 2 phép JOIN (HOA_DON nối với KHACH_HANG qua Ma_khach_hang, nối với MAT_HANG qua Ma_mat_hang) và tính biểu thức (hd.So_luong * mh.Don_gia).',
      relatedSql: `SELECT hd.So_don, kh.Ho_ten, mh.Ten_mat_hang, hd.So_luong, mh.Don_gia, (hd.So_luong * mh.Don_gia) AS Thanh_tien\nFROM HOA_DON hd\nJOIN KHACH_HANG kh ON hd.Ma_khach_hang = kh.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang\nORDER BY hd.So_don;`,
    },
    {
      id: 'KD-Q08',
      databaseId: 'KINH_DOANH',
      level: 'Vận dụng',
      order: 8,
      question: 'Câu lệnh SQL nào dưới đây tính tổng số lượng đã bán và tổng doanh thu cho từng Mặt hàng, sắp xếp theo tổng doanh thu giảm dần?',
      options: [
        { key: 'A', text: `SELECT mh.Ma_mat_hang, mh.Ten_mat_hang, SUM(hd.So_luong) AS Tong_ban, SUM(hd.So_luong * mh.Don_gia) AS Tong_doanh_thu\nFROM MAT_HANG mh\nJOIN HOA_DON hd ON mh.Ma_mat_hang = hd.Ma_mat_hang\nGROUP BY mh.Ma_mat_hang, mh.Ten_mat_hang\nORDER BY Tong_doanh_thu DESC;` },
        { key: 'B', text: `SELECT mh.Ma_mat_hang, (hd.So_luong * mh.Don_gia) AS Tong_doanh_thu\nFROM MAT_HANG mh\nORDER BY Tong_doanh_thu DESC;` },
        { key: 'C', text: `SELECT mh.Ma_mat_hang, COUNT(hd.So_don) FROM MAT_HANG mh GROUP BY mh.Ma_mat_hang;` },
        { key: 'D', text: `SELECT mh.Ten_mat_hang, AVG(hd.So_luong) FROM HOA_DON hd GROUP BY mh.Ten_mat_hang;` },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối bảng MAT_HANG với HOA_DON, gom nhóm theo mặt hàng (GROUP BY mh.Ma_mat_hang, mh.Ten_mat_hang) và dùng hàm SUM để tính tổng số lượng cùng tổng tiền.',
      relatedSql: `SELECT mh.Ma_mat_hang, mh.Ten_mat_hang, SUM(hd.So_luong) AS Tong_ban, SUM(hd.So_luong * mh.Don_gia) AS Tong_doanh_thu\nFROM MAT_HANG mh\nJOIN HOA_DON hd ON mh.Ma_mat_hang = hd.Ma_mat_hang\nGROUP BY mh.Ma_mat_hang, mh.Ten_mat_hang\nORDER BY Tong_doanh_thu DESC;`,
    },
    {
      id: 'KD-Q09',
      databaseId: 'KINH_DOANH',
      level: 'Vận dụng',
      order: 9,
      question: 'Làm thế nào để tìm ra thông tin vị khách hàng đã chi tiêu số tiền mua hàng nhiều nhất trong hệ thống?',
      options: [
        { key: 'A', text: `SELECT kh.Ma_khach_hang, kh.Ho_ten, SUM(hd.So_luong * mh.Don_gia) AS Tong_chi_tieu\nFROM KHACH_HANG kh\nJOIN HOA_DON hd ON kh.Ma_khach_hang = hd.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang\nGROUP BY kh.Ma_khach_hang, kh.Ho_ten\nORDER BY Tong_chi_tieu DESC\nLIMIT 1;` },
        { key: 'B', text: `SELECT kh.Ho_ten, MAX(hd.So_luong * mh.Don_gia) FROM KHACH_HANG kh;` },
        { key: 'C', text: `SELECT kh.Ho_ten FROM KHACH_HANG kh WHERE Tong_chi_tieu = MAX();` },
        { key: 'D', text: `SELECT kh.Ho_ten, SUM(hd.So_luong) FROM HOA_DON hd GROUP BY kh.Ho_ten;` },
      ],
      correctAnswer: 'A',
      explanation: 'Nhóm theo từng khách hàng, tính tổng tiền chi tiêu SUM(hd.So_luong * mh.Don_gia), sắp xếp giảm dần (ORDER BY Tong_chi_tieu DESC) và lấy bản ghi đứng đầu bảng bằng LIMIT 1.',
      relatedSql: `SELECT kh.Ma_khach_hang, kh.Ho_ten, kh.Dia_chi, SUM(hd.So_luong * mh.Don_gia) AS Tong_chi_tieu\nFROM KHACH_HANG kh\nJOIN HOA_DON hd ON kh.Ma_khach_hang = hd.Ma_khach_hang\nJOIN MAT_HANG mh ON hd.Ma_mat_hang = mh.Ma_mat_hang\nGROUP BY kh.Ma_khach_hang, kh.Ho_ten\nORDER BY Tong_chi_tieu DESC\nLIMIT 1;`,
    },
    {
      id: 'KD-Q10',
      databaseId: 'KINH_DOANH',
      level: 'Vận dụng',
      order: 10,
      question: 'Để tìm danh sách các khách hàng trong bảng KHACH_HANG mà chưa từng phát sinh bất kỳ đơn hàng nào trong bảng HOA_DON, câu lệnh truy vấn con (Subquery) nào sau đây là đúng?',
      options: [
        { key: 'A', text: `SELECT Ma_khach_hang, Ho_ten, Dia_chi\nFROM KHACH_HANG\nWHERE Ma_khach_hang NOT IN (SELECT Ma_khach_hang FROM HOA_DON);` },
        { key: 'B', text: `SELECT * FROM KHACH_HANG WHERE Ma_khach_hang IN (SELECT Ma_khach_hang FROM HOA_DON);` },
        { key: 'C', text: `SELECT * FROM KHACH_HANG kh JOIN HOA_DON hd ON kh.Ma_khach_hang = hd.Ma_khach_hang WHERE hd.So_don IS NULL;` },
        { key: 'D', text: `SELECT * FROM KHACH_HANG WHERE So_don = 0;` },
      ],
      correctAnswer: 'A',
      explanation: 'Toán tử NOT IN kết hợp truy vấn con (Subquery) lọc ra các mã khách hàng không hiện diện trong danh sách mã khách hàng của bảng HOA_DON (ở dữ liệu mẫu là khách KH05 - Võ Quốc Hưng).',
      relatedSql: `SELECT Ma_khach_hang, Ho_ten, Dia_chi\nFROM KHACH_HANG\nWHERE Ma_khach_hang NOT IN (SELECT Ma_khach_hang FROM HOA_DON);`,
    },
  ],

  // ==========================================
  // 3. CSDL HỌC TẬP (3 Bảng - Điểm Số)
  // ==========================================
  HOC_TAP: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'HT-Q01',
      databaseId: 'HOC_TAP',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong định nghĩa bảng BANG_DIEM, ràng buộc CHECK(Diem_so >= 0 AND Diem_so <= 10) có tác dụng gì?',
      options: [
        { key: 'A', text: 'Tự động tính điểm trung bình cho học sinh.' },
        { key: 'B', text: 'Bảo đảm điểm số nhập vào luôn hợp lệ trong thang điểm từ 0 đến 10, ngăn ngừa nhập điểm âm hoặc lớn hơn 10.' },
        { key: 'C', text: 'Giới hạn số lần kiểm tra tối đa của mỗi học sinh là 10 lần.' },
        { key: 'D', text: 'Tự động xếp loại học sinh theo mức điểm đạt được.' },
      ],
      correctAnswer: 'B',
      explanation: 'Ràng buộc CHECK định nghĩa điều kiện hợp lệ của giá trị cột: Diem_so chỉ được phép nằm trong khoảng từ 0.0 đến 10.0.',
      relatedSql: `SELECT ID, Ma_hoc_sinh, Ma_mon_hoc, Diem_so\nFROM BANG_DIEM;`,
    },
    {
      id: 'HT-Q02',
      databaseId: 'HOC_TAP',
      level: 'Nhận biết',
      order: 2,
      question: 'Bảng BANG_DIEM có bao nhiêu cột giữ vai trò là Khóa ngoại (Foreign Key)?',
      options: [
        { key: 'A', text: '1 cột (Ma_hoc_sinh)' },
        { key: 'B', text: '2 cột (Ma_hoc_sinh tham chiếu HOC_SINH và Ma_mon_hoc tham chiếu MON_HOC)' },
        { key: 'C', text: '3 cột' },
        { key: 'D', text: 'Không có cột nào là khóa ngoại' },
      ],
      correctAnswer: 'B',
      explanation: 'Bảng BANG_DIEM có 2 khóa ngoại: Ma_hoc_sinh tham chiếu tới HOC_SINH(Ma_hoc_sinh) và Ma_mon_hoc tham chiếu tới MON_HOC(Ma_mon_hoc).',
      relatedSql: `SELECT bd.ID, hs.Ten, mh.Ten_mon_hoc, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc;`,
    },
    {
      id: 'HT-Q03',
      databaseId: 'HOC_TAP',
      level: 'Nhận biết',
      order: 3,
      question: 'Lệnh SQL nào sau đây sẽ xóa toàn bộ các dòng dữ liệu trong bảng BANG_DIEM nhưng vẫn giữ nguyên cấu trúc bảng?',
      options: [
        { key: 'A', text: 'DROP TABLE BANG_DIEM;' },
        { key: 'B', text: 'DELETE FROM BANG_DIEM;' },
        { key: 'C', text: 'REMOVE ALL FROM BANG_DIEM;' },
        { key: 'D', text: 'TRUNCATE SCHEMA BANG_DIEM;' },
      ],
      correctAnswer: 'B',
      explanation: 'Lệnh DELETE FROM BANG_DIEM; xóa toàn bộ các bản ghi trong bảng mà không hủy bỏ định nghĩa cấu trúc của bảng (khác với DROP TABLE sẽ xóa sạch cả cấu trúc bảng).',
      relatedSql: `SELECT COUNT(*) AS Tong_So_Ban_Ghi FROM BANG_DIEM;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'HT-Q04',
      databaseId: 'HOC_TAP',
      level: 'Thông hiểu',
      order: 4,
      question: 'Biểu thức SQL sau trong mệnh đề SELECT có ý nghĩa gì?\nhs.Ho_dem || \' \' || hs.Ten AS Ho_ten',
      sqlSnippet: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten\nFROM HOC_SINH hs;`,
      options: [
        { key: 'A', text: 'So sánh hai chuỗi họ đệm và tên xem có giống nhau không.' },
        { key: 'B', text: 'Sử dụng toán tử ghép chuỗi (||) để nối chuỗi Ho_dem, dấu cách và Ten thành một cột hiển thị thống nhất có bí danh là Ho_ten.' },
        { key: 'C', text: 'Thực hiện phép toán logic OR giữa họ và tên.' },
        { key: 'D', text: 'Tách chuỗi họ và tên thành hai dòng riêng biệt.' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong chuẩn SQL và SQLite, toán tử hai gạch đứng (||) là toán tử nối chuỗi (String Concatenation), giúp ghép họ đệm và tên thành họ tên đầy đủ.',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten\nFROM HOC_SINH hs;`,
    },
    {
      id: 'HT-Q05',
      databaseId: 'HOC_TAP',
      level: 'Thông hiểu',
      order: 5,
      question: 'Cho câu lệnh SQL:\nSELECT AVG(Diem_so) AS DTB_Mon_Toan\nFROM BANG_DIEM\nWHERE Ma_mon_hoc = \'TOAN\';\nKết quả trả về của câu lệnh mang ý nghĩa gì?',
      sqlSnippet: `SELECT ROUND(AVG(Diem_so), 2) AS DTB_Mon_Toan\nFROM BANG_DIEM\nWHERE Ma_mon_hoc = 'TOAN';`,
      options: [
        { key: 'A', text: 'Điểm số môn Toán của học sinh đầu tiên trong bảng.' },
        { key: 'B', text: 'Điểm trung bình cộng của tất cả các bài kiểm tra thuộc môn Toán có trong bảng điểm.' },
        { key: 'C', text: 'Tổng số điểm môn Toán mà các bạn học sinh đạt được.' },
        { key: 'D', text: 'Số lượng học sinh đã tham gia thi môn Toán.' },
      ],
      correctAnswer: 'B',
      explanation: 'Hàm AVG(Diem_so) kết hợp điều kiện lọc WHERE Ma_mon_hoc = \'TOAN\' tính giá trị trung bình cộng điểm số của riêng các bài kiểm tra môn Toán.',
      relatedSql: `SELECT ROUND(AVG(Diem_so), 2) AS DTB_Mon_Toan\nFROM BANG_DIEM\nWHERE Ma_mon_hoc = 'TOAN';`,
    },
    {
      id: 'HT-Q06',
      databaseId: 'HOC_TAP',
      level: 'Thông hiểu',
      order: 6,
      question: 'Khi thực hiện liên kết giữa bảng HOC_SINH và BANG_DIEM, sự khác biệt giữa INNER JOIN và LEFT JOIN là gì?',
      options: [
        { key: 'A', text: 'INNER JOIN hiển thị cả những học sinh chưa có bất kỳ bài kiểm tra nào trong BANG_DIEM.' },
        { key: 'B', text: 'LEFT JOIN sẽ giữ lại tất cả các học sinh ở bảng HOC_SINH (bên trái), nếu học sinh đó chưa có bài kiểm tra nào thì các cột của BANG_DIEM sẽ mang giá trị NULL.' },
        { key: 'C', text: 'LEFT JOIN tự động loại bỏ các học sinh có điểm dưới trung bình.' },
        { key: 'D', text: 'Hai phép kết nối này luôn cho ra kết quả hoàn toàn giống hệt nhau.' },
      ],
      correctAnswer: 'B',
      explanation: 'LEFT JOIN bảo toàn mọi bản ghi ở bảng nguồn bên trái (HOC_SINH), điền NULL cho các trường ở bảng bên phải nếu không tìm thấy bản ghi tương ứng.',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ten, bd.Diem_so\nFROM HOC_SINH hs\nLEFT JOIN BANG_DIEM bd ON hs.Ma_hoc_sinh = bd.Ma_hoc_sinh;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'HT-Q07',
      databaseId: 'HOC_TAP',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh SQL nào sau đây hiển thị danh sách gồm: Mã học sinh, Họ tên, Tên môn học, Ngày kiểm tra và Điểm số cho tất cả bài kiểm tra đạt điểm giỏi (Diem_so >= 8.5)?',
      options: [
        { key: 'A', text: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, mh.Ten_mon_hoc, bd.Ngay_kiem_tra, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc\nWHERE bd.Diem_so >= 8.5;` },
        { key: 'B', text: `SELECT * FROM BANG_DIEM WHERE Diem_so >= 8.5;` },
        { key: 'C', text: `SELECT hs.Ho_dem, mh.Ten_mon_hoc FROM HOC_SINH hs, MON_HOC mh WHERE Diem_so >= 8.5;` },
        { key: 'D', text: `SELECT hs.Ma_hoc_sinh, bd.Diem_so FROM BANG_DIEM bd HAVING bd.Diem_so >= 8.5;` },
      ],
      correctAnswer: 'A',
      explanation: 'Nối 3 bảng BANG_DIEM, HOC_SINH và MON_HOC bằng INNER JOIN với điều kiện lọc WHERE bd.Diem_so >= 8.5 để lấy đầy đủ thông tin tên học sinh và tên môn học.',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, mh.Ten_mon_hoc, bd.Ngay_kiem_tra, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nJOIN MON_HOC mh ON bd.Ma_mon_hoc = mh.Ma_mon_hoc\nWHERE bd.Diem_so >= 8.5;`,
    },
    {
      id: 'HT-Q08',
      databaseId: 'HOC_TAP',
      level: 'Vận dụng',
      order: 8,
      question: 'Viết câu lệnh tính điểm trung bình chung các bài kiểm tra của từng học sinh (hiển thị Ma_hoc_sinh, Ho_ten, Diem_TB) và chỉ lấy những bạn có Điểm_TB >= 8.0?',
      options: [
        { key: 'A', text: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, ROUND(AVG(bd.Diem_so), 2) AS Diem_TB\nFROM HOC_SINH hs\nJOIN BANG_DIEM bd ON hs.Ma_hoc_sinh = bd.Ma_hoc_sinh\nGROUP BY hs.Ma_hoc_sinh, Ho_ten\nHAVING AVG(bd.Diem_so) >= 8.0\nORDER BY Diem_TB DESC;` },
        { key: 'B', text: `SELECT hs.Ma_hoc_sinh, AVG(bd.Diem_so) AS Diem_TB FROM BANG_DIEM bd WHERE AVG(bd.Diem_so) >= 8.0 GROUP BY hs.Ma_hoc_sinh;` },
        { key: 'C', text: `SELECT hs.Ma_hoc_sinh, AVG(bd.Diem_so) FROM HOC_SINH hs WHERE Diem_so >= 8.0;` },
        { key: 'D', text: `SELECT hs.Ma_hoc_sinh, SUM(bd.Diem_so) AS Diem_TB FROM BANG_DIEM bd GROUP BY hs.Ma_hoc_sinh;` },
      ],
      correctAnswer: 'A',
      explanation: 'Gom nhóm theo học sinh (GROUP BY hs.Ma_hoc_sinh, Ho_ten), lọc nhóm bằng HAVING AVG(bd.Diem_so) >= 8.0 và làm tròn kết quả với ROUND().',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, COUNT(bd.ID) AS So_Bai, ROUND(AVG(bd.Diem_so), 2) AS Diem_TB\nFROM HOC_SINH hs\nJOIN BANG_DIEM bd ON hs.Ma_hoc_sinh = bd.Ma_hoc_sinh\nGROUP BY hs.Ma_hoc_sinh, Ho_ten\nHAVING AVG(bd.Diem_so) >= 8.0\nORDER BY Diem_TB DESC;`,
    },
    {
      id: 'HT-Q09',
      databaseId: 'HOC_TAP',
      level: 'Vận dụng',
      order: 9,
      question: 'Để tìm thông tin học sinh đạt điểm cao nhất trong môn Tin học (\'TIN\'), câu lệnh SQL nào dưới đây là chính xác và ngắn gọn nhất?',
      options: [
        { key: 'A', text: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nWHERE bd.Ma_mon_hoc = 'TIN'\nORDER BY bd.Diem_so DESC\nLIMIT 1;` },
        { key: 'B', text: `SELECT hs.Ho_ten, MAX(bd.Diem_so) FROM BANG_DIEM bd;` },
        { key: 'C', text: `SELECT * FROM BANG_DIEM WHERE Ma_mon_hoc = 'TIN' AND Diem_so = 10;` },
        { key: 'D', text: `SELECT hs.Ma_hoc_sinh FROM HOC_SINH hs WHERE Ma_mon_hoc = 'TIN';` },
      ],
      correctAnswer: 'A',
      explanation: 'Lọc điều kiện bd.Ma_mon_hoc = \'TIN\', sắp xếp điểm giảm dần (ORDER BY bd.Diem_so DESC) và lấy bản ghi vị trí đầu bảng với LIMIT 1 (học sinh Nguyễn Quốc Cường, 9.5 điểm).',
      relatedSql: `SELECT hs.Ma_hoc_sinh, hs.Ho_dem || ' ' || hs.Ten AS Ho_ten, bd.Diem_so\nFROM BANG_DIEM bd\nJOIN HOC_SINH hs ON bd.Ma_hoc_sinh = hs.Ma_hoc_sinh\nWHERE bd.Ma_mon_hoc = 'TIN'\nORDER BY bd.Diem_so DESC\nLIMIT 1;`,
    },
    {
      id: 'HT-Q10',
      databaseId: 'HOC_TAP',
      level: 'Vận dụng',
      order: 10,
      question: 'Để thống kê số lượng bài kiểm tra đã thực hiện theo từng môn học (kể cả những môn học chưa có bài kiểm tra nào trong bảng BANG_DIEM), câu lệnh SQL nào sau đây là chuẩn xác?',
      options: [
        { key: 'A', text: `SELECT mh.Ma_mon_hoc, mh.Ten_mon_hoc, COUNT(bd.ID) AS So_bai_KT\nFROM MON_HOC mh\nLEFT JOIN BANG_DIEM bd ON mh.Ma_mon_hoc = bd.Ma_mon_hoc\nGROUP BY mh.Ma_mon_hoc, mh.Ten_mon_hoc;` },
        { key: 'B', text: `SELECT mh.Ten_mon_hoc, COUNT(*) FROM MON_HOC mh JOIN BANG_DIEM bd ON mh.Ma_mon_hoc = bd.Ma_mon_hoc;` },
        { key: 'C', text: `SELECT mh.Ten_mon_hoc, SUM(bd.ID) FROM MON_HOC mh GROUP BY mh.Ten_mon_hoc;` },
        { key: 'D', text: `SELECT mh.Ma_mon_hoc, COUNT(bd.ID) FROM BANG_DIEM bd GROUP BY bd.Ma_mon_hoc;` },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng LEFT JOIN từ MON_HOC sang BANG_DIEM và COUNT(bd.ID) (chứ không dùng COUNT(*)) để nếu môn học chưa có bài thi nào thì COUNT(NULL) sẽ trả về 0 chính xác.',
      relatedSql: `SELECT mh.Ma_mon_hoc, mh.Ten_mon_hoc, COUNT(bd.ID) AS So_bai_KT\nFROM MON_HOC mh\nLEFT JOIN BANG_DIEM bd ON mh.Ma_mon_hoc = bd.Ma_mon_hoc\nGROUP BY mh.Ma_mon_hoc, mh.Ten_mon_hoc;`,
    },
  ],

  // ==========================================
  // 4. CSDL ÂM NHẠC (4 Bảng - Nhạc Sĩ & Ca Sĩ)
  // ==========================================
  AM_NHAC: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'AN-Q01',
      databaseId: 'AM_NHAC',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong mô hình CSDL Âm nhạc, mối quan hệ nhiều - nhiều (N:N) giữa BAN_NHAC và CA_SI được giải quyết thông qua bảng trung gian nào?',
      options: [
        { key: 'A', text: 'Bảng NHAC_SI' },
        { key: 'B', text: 'Bảng BAN_THU_AM' },
        { key: 'C', text: 'Bảng THE_LOAI' },
        { key: 'D', text: 'Bảng ALBUM' },
      ],
      correctAnswer: 'B',
      explanation: 'Một bản nhạc có thể được nhiều ca sĩ thu âm, và một ca sĩ có thể thu âm nhiều bản nhạc. Bảng BAN_THU_AM đóng vai trò bảng liên kết (Junction Table) lưu trữ cặp (Mid, Sid).',
      relatedSql: `SELECT Mid, Sid\nFROM BAN_THU_AM;`,
    },
    {
      id: 'AN-Q02',
      databaseId: 'AM_NHAC',
      level: 'Nhận biết',
      order: 2,
      question: 'Trong bảng BAN_THU_AM, cặp thuộc tính (Mid, Sid) cùng giữ vai trò gì?',
      options: [
        { key: 'A', text: 'Chỉ là khóa ngoại đơn thuần' },
        { key: 'B', text: 'Là khóa chính kết hợp (Composite Primary Key), đồng thời mỗi thuộc tính là một khóa ngoại tham chiếu tương ứng đến BAN_NHAC và CA_SI' },
        { key: 'C', text: 'Là hai trường dữ liệu tùy chọn' },
        { key: 'D', text: 'Chỉ là chỉ mục tìm kiếm thông thường' },
      ],
      correctAnswer: 'B',
      explanation: 'Cặp (Mid, Sid) là PRIMARY KEY (Mid, Sid) để mỗi ca sĩ chỉ có một bản thu âm định danh duy nhất cho một bài hát, đồng thời Mid tham chiếu BAN_NHAC và Sid tham chiếu CA_SI.',
      relatedSql: `SELECT Mid, Sid\nFROM BAN_THU_AM\nORDER BY Mid;`,
    },
    {
      id: 'AN-Q03',
      databaseId: 'AM_NHAC',
      level: 'Nhận biết',
      order: 3,
      question: 'Để tìm các bản nhạc có tên bắt đầu bằng từ "Du kích", ta sử dụng mẫu so khớp chuỗi nào với toán tử LIKE?',
      options: [
        { key: 'A', text: 'WHERE TenBN LIKE \'Du kích*\'' },
        { key: 'B', text: 'WHERE TenBN LIKE \'Du kích%\'' },
        { key: 'C', text: 'WHERE TenBN = \'Du kích\'' },
        { key: 'D', text: 'WHERE TenBN IN (\'Du kích\')' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong SQL chuẩn, ký tự phần trăm (%) đại diện cho chuỗi ký tự bất kỳ có độ dài tùy ý (0 hoặc nhiều ký tự). Cú pháp \'Du kích%\' khớp với mọi chuỗi bắt đầu bằng "Du kích".',
      relatedSql: `SELECT Mid, TenBN\nFROM BAN_NHAC\nWHERE TenBN LIKE 'Du kích%';`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'AN-Q04',
      databaseId: 'AM_NHAC',
      level: 'Thông hiểu',
      order: 4,
      question: 'Câu lệnh SQL sau đây thực hiện yêu cầu gì?\nSELECT bn.TenBN, ns.TenNS\nFROM BAN_NHAC bn\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = \'Văn Cao\';',
      sqlSnippet: `SELECT bn.TenBN, ns.TenNS\nFROM BAN_NHAC bn\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';`,
      options: [
        { key: 'A', text: 'Tìm tất cả các ca sĩ từng thể hiện bài hát của nhạc sĩ Văn Cao.' },
        { key: 'B', text: 'Liệt kê danh sách tên các bản nhạc do nhạc sĩ Văn Cao sáng tác.' },
        { key: 'C', text: 'Đếm số lượng ca khúc do Văn Cao biểu diễn.' },
        { key: 'D', text: 'Tìm bài hát có tên là "Văn Cao".' },
      ],
      correctAnswer: 'B',
      explanation: 'Liên kết bảng BAN_NHAC với NHAC_SI qua khóa ngoại Aid và lọc ns.TenNS = \'Văn Cao\' để lấy danh sách sáng tác của ông (Trường ca Sông Lô, Tiến về Hà Nội).',
      relatedSql: `SELECT bn.Mid, bn.TenBN, ns.TenNS\nFROM BAN_NHAC bn\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';`,
    },
    {
      id: 'AN-Q05',
      databaseId: 'AM_NHAC',
      level: 'Thông hiểu',
      order: 5,
      question: 'Cho câu lệnh SQL:\nSELECT Mid, COUNT(Sid) AS So_Ca_Si\nFROM BAN_THU_AM\nGROUP BY Mid\nHAVING COUNT(Sid) > 1;\nMệnh đề HAVING ở đây thực hiện chức năng gì?',
      sqlSnippet: `SELECT Mid, COUNT(Sid) AS So_Ca_Si\nFROM BAN_THU_AM\nGROUP BY Mid\nHAVING COUNT(Sid) > 1;`,
      options: [
        { key: 'A', text: 'Sắp xếp danh sách bài hát theo số ca sĩ tăng dần.' },
        { key: 'B', text: 'Lọc ra các bản nhạc (Mid) có nhiều hơn 1 ca sĩ tham gia thu âm.' },
        { key: 'C', text: 'Xóa đi các bản nhạc chỉ có 1 ca sĩ hát.' },
        { key: 'D', text: 'Lọc các ca sĩ hát nhiều hơn 1 bài.' },
      ],
      correctAnswer: 'B',
      explanation: 'HAVING COUNT(Sid) > 1 là điều kiện lọc nhóm sau khi gom nhóm theo Mid, chỉ giữ lại các tác phẩm có từ 2 ca sĩ thu âm trở lên.',
      relatedSql: `SELECT bn.Mid, bn.TenBN, COUNT(bta.Sid) AS So_Ca_Si\nFROM BAN_NHAC bn\nJOIN BAN_THU_AM bta ON bn.Mid = bta.Mid\nGROUP BY bn.Mid, bn.TenBN\nHAVING COUNT(bta.Sid) > 1;`,
    },
    {
      id: 'AN-Q06',
      databaseId: 'AM_NHAC',
      level: 'Thông hiểu',
      order: 6,
      question: 'Khi muốn lấy danh sách tên các ca sĩ duy nhất (không bị lặp lại) đã từng thực hiện ít nhất một bản thu âm, ta sử dụng từ khóa nào ngay sau SELECT?',
      options: [
        { key: 'A', text: 'UNIQUE' },
        { key: 'B', text: 'DISTINCT' },
        { key: 'C', text: 'PRIMARY' },
        { key: 'D', text: 'SINGLE' },
      ],
      correctAnswer: 'B',
      explanation: 'Từ khóa SELECT DISTINCT loại bỏ tất cả các dòng trùng lặp trong kết quả trả về, đảm bảo mỗi ca sĩ chỉ xuất hiện đúng một lần.',
      relatedSql: `SELECT DISTINCT cs.Sid, cs.TenCS\nFROM CA_SI cs\nJOIN BAN_THU_AM bta ON cs.Sid = bta.Sid;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'AN-Q07',
      databaseId: 'AM_NHAC',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh SQL nào sau đây hiển thị đầy đủ thông tin mỗi bản thu âm gồm: Mã bài hát, Tên bản nhạc, Tên ca sĩ thể hiện và Tên nhạc sĩ sáng tác bằng cách kết nối cả 4 bảng?',
      options: [
        { key: 'A', text: `SELECT bn.Mid, bn.TenBN, cs.TenCS, ns.TenNS\nFROM BAN_THU_AM bta\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN CA_SI cs ON bta.Sid = cs.Sid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nORDER BY bn.Mid, cs.TenCS;` },
        { key: 'B', text: `SELECT bn.TenBN, cs.TenCS, ns.TenNS FROM BAN_NHAC bn, CA_SI cs, NHAC_SI ns;` },
        { key: 'C', text: `SELECT * FROM BAN_THU_AM;` },
        { key: 'D', text: `SELECT bn.TenBN, ns.TenNS FROM BAN_NHAC bn JOIN NHAC_SI ns ON bn.Aid = ns.Aid;` },
      ],
      correctAnswer: 'A',
      explanation: 'Bảng BAN_THU_AM nối với BAN_NHAC qua Mid, nối với CA_SI qua Sid, và từ BAN_NHAC nối sang NHAC_SI qua Aid để lấy toàn bộ thông tin của 4 thực thể.',
      relatedSql: `SELECT bn.Mid, bn.TenBN, cs.TenCS, ns.TenNS\nFROM BAN_THU_AM bta\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN CA_SI cs ON bta.Sid = cs.Sid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nORDER BY bn.Mid, cs.TenCS;`,
    },
    {
      id: 'AN-Q08',
      databaseId: 'AM_NHAC',
      level: 'Vận dụng',
      order: 8,
      question: 'Câu lệnh SQL nào sau đây thống kê số lượng bản nhạc mà mỗi nhạc sĩ đã sáng tác (kể cả nhạc sĩ chưa có bài hát nào trong CSDL), sắp xếp theo số lượng tác phẩm giảm dần?',
      options: [
        { key: 'A', text: `SELECT ns.Aid, ns.TenNS, COUNT(bn.Mid) AS So_luong_tac_pham\nFROM NHAC_SI ns\nLEFT JOIN BAN_NHAC bn ON ns.Aid = bn.Aid\nGROUP BY ns.Aid, ns.TenNS\nORDER BY So_luong_tac_pham DESC;` },
        { key: 'B', text: `SELECT ns.TenNS, COUNT(*) FROM NHAC_SI ns JOIN BAN_NHAC bn ON ns.Aid = bn.Aid;` },
        { key: 'C', text: `SELECT ns.Aid, SUM(bn.Mid) FROM NHAC_SI ns GROUP BY ns.Aid;` },
        { key: 'D', text: `SELECT ns.TenNS, COUNT(bn.Mid) FROM BAN_NHAC bn GROUP BY bn.Aid;` },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng LEFT JOIN từ NHAC_SI sang BAN_NHAC kết hợp hàm COUNT(bn.Mid) để tính toán chính xác cả những nhạc sĩ chưa có tác phẩm nào (kết quả trả về 0 tác phẩm thay vì bị loại bỏ).',
      relatedSql: `SELECT ns.Aid, ns.TenNS, COUNT(bn.Mid) AS So_luong_tac_pham\nFROM NHAC_SI ns\nLEFT JOIN BAN_NHAC bn ON ns.Aid = bn.Aid\nGROUP BY ns.Aid, ns.TenNS\nORDER BY So_luong_tac_pham DESC;`,
    },
    {
      id: 'AN-Q09',
      databaseId: 'AM_NHAC',
      level: 'Vận dụng',
      order: 9,
      question: 'Tìm danh sách các ca sĩ (hiển thị Sid, TenCS) đã từng thể hiện ít nhất một ca khúc của nhạc sĩ \'Văn Cao\'.',
      options: [
        { key: 'A', text: `SELECT DISTINCT cs.Sid, cs.TenCS\nFROM CA_SI cs\nJOIN BAN_THU_AM bta ON cs.Sid = bta.Sid\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';` },
        { key: 'B', text: `SELECT cs.TenCS FROM CA_SI cs WHERE cs.TenNS = 'Văn Cao';` },
        { key: 'C', text: `SELECT * FROM CA_SI cs JOIN NHAC_SI ns ON cs.Sid = ns.Aid WHERE ns.TenNS = 'Văn Cao';` },
        { key: 'D', text: `SELECT cs.TenCS FROM BAN_THU_AM WHERE Aid = 2;` },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối từ CA_SI -> BAN_THU_AM -> BAN_NHAC -> NHAC_SI, lọc theo ns.TenNS = \'Văn Cao\' và dùng DISTINCT để không lặp lại ca sĩ (kết quả là ca sĩ Trần Khánh - TK).',
      relatedSql: `SELECT DISTINCT cs.Sid, cs.TenCS\nFROM CA_SI cs\nJOIN BAN_THU_AM bta ON cs.Sid = bta.Sid\nJOIN BAN_NHAC bn ON bta.Mid = bn.Mid\nJOIN NHAC_SI ns ON bn.Aid = ns.Aid\nWHERE ns.TenNS = 'Văn Cao';`,
    },
    {
      id: 'AN-Q10',
      databaseId: 'AM_NHAC',
      level: 'Vận dụng',
      order: 10,
      question: 'Để ghi nhận một bản thu âm mới: ca sĩ \'TK\' (Trần Khánh) thể hiện bản nhạc mã \'0004\' (Xa khơi), câu lệnh SQL nào sau đây là chính xác?',
      options: [
        { key: 'A', text: `INSERT INTO BAN_THU_AM (Mid, Sid) VALUES ('0004', 'TK');` },
        { key: 'B', text: `ADD RECORD TO BAN_THU_AM VALUES ('0004', 'TK');` },
        { key: 'C', text: `UPDATE BAN_THU_AM SET Mid = '0004', Sid = 'TK';` },
        { key: 'D', text: `INSERT INTO BAN_NHAC VALUES ('0004', 'TK');` },
      ],
      correctAnswer: 'A',
      explanation: 'Chèn bản ghi vào bảng liên kết BAN_THU_AM với hai khóa ngoại: Mid = \'0004\' và Sid = \'TK\'.',
      relatedSql: `INSERT INTO BAN_THU_AM (Mid, Sid)\nVALUES ('0004', 'TK');`,
    },
  ],

  // ==========================================
  // 6. CSDL QL_XE (3 Bảng - Xe, Loại Xe, Hóa Đơn)
  // ==========================================
  QL_XE: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'XE-Q01',
      databaseId: 'QL_XE',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL QL_XE, trường MaLoai trong bảng DANH_MUC_XE đóng vai trò gì?',
      options: [
        { key: 'A', text: 'Khóa chính (PRIMARY KEY) định danh duy nhất cho từng xe trong bảng DANH_MUC_XE' },
        { key: 'B', text: 'Khóa ngoại (FOREIGN KEY) tham chiếu đến khóa chính MaLoai của bảng LOAI_XE' },
        { key: 'C', text: 'Thuộc tính chỉ mục không liên quan đến quan hệ giữa các bảng' },
        { key: 'D', text: 'Khóa chính tự tăng (AUTOINCREMENT) của bảng DANH_MUC_XE' },
      ],
      correctAnswer: 'B',
      explanation: 'MaLoai trong DANH_MUC_XE là khóa ngoại (FOREIGN KEY) tham chiếu tới bảng LOAI_XE(MaLoai) để xác định phân loại phương tiện.',
      relatedSql: 'SELECT x.MaXe, x.TenXe, x.MaLoai, l.LoaiXe\nFROM DANH_MUC_XE x\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai;',
    },
    {
      id: 'XE-Q02',
      databaseId: 'QL_XE',
      level: 'Nhận biết',
      order: 2,
      question: 'Cú pháp SQL chuẩn nào dùng để lấy danh sách toàn bộ các loại xe trong bảng LOAI_XE sắp xếp theo thứ tự bảng chữ cái A-Z của LoaiXe?',
      options: [
        { key: 'A', text: 'SELECT * FROM LOAI_XE ORDER BY LoaiXe ASC;' },
        { key: 'B', text: 'SELECT ALL FROM LOAI_XE SORT BY LoaiXe;' },
        { key: 'C', text: 'SELECT * FROM LOAI_XE GROUP BY LoaiXe ASC;' },
        { key: 'D', text: 'FILTER LOAI_XE ORDER BY LoaiXe;' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ORDER BY LoaiXe ASC sắp xếp kết quả tăng dần từ A-Z theo tên loại xe.',
      relatedSql: 'SELECT MaLoai, LoaiXe\nFROM LOAI_XE\nORDER BY LoaiXe ASC;',
    },
    {
      id: 'XE-Q03',
      databaseId: 'QL_XE',
      level: 'Nhận biết',
      order: 3,
      question: 'Trong bảng HOA_DON, ràng buộc "CHECK(SoLuong > 0)" mang ý nghĩa gì trong thiết kế CSDL?',
      options: [
        { key: 'A', text: 'Tự động gán số lượng là 1 nếu người dùng không nhập' },
        { key: 'B', text: 'Ngăn chặn nhập số lượng âm hoặc bằng 0, đảm bảo số lượng bán phải là số dương hợp lệ' },
        { key: 'C', text: 'Giới hạn số lượng xe bán tối đa trong một hóa đơn là 10' },
        { key: 'D', text: 'Tự động tính tổng tiền khi số lượng thay đổi' },
      ],
      correctAnswer: 'B',
      explanation: 'Ràng buộc CHECK(SoLuong > 0) là ràng buộc toàn vẹn miền giá trị, đảm bảo mọi hóa đơn đều phải có số lượng bán lớn hơn 0.',
      relatedSql: 'SELECT SoHD, MaXe, SoLuong, DonGia\nFROM HOA_DON\nWHERE SoLuong > 0;',
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'XE-Q04',
      databaseId: 'QL_XE',
      level: 'Thông hiểu',
      order: 4,
      question: 'Cho câu lệnh: SELECT COUNT(*) FROM HOA_DON WHERE SoLuong >= 2; Kết quả của câu lệnh này thể hiện điều gì?',
      options: [
        { key: 'A', text: 'Tổng số xe đã bán trong tất cả các hóa đơn' },
        { key: 'B', text: 'Số lượng hóa đơn bán hàng có số lượng xe bán từ 2 chiếc trở lên' },
        { key: 'C', text: 'Tổng doanh thu của các hóa đơn bán từ 2 xe trở lên' },
        { key: 'D', text: 'Danh sách các mã xe có số lượng bán lớn hơn 2' },
      ],
      correctAnswer: 'B',
      explanation: 'Hàm COUNT(*) đếm số dòng (số bản ghi hóa đơn) thỏa mãn điều kiện lọc WHERE SoLuong >= 2.',
      relatedSql: 'SELECT COUNT(*) AS SoHoaDonBanLon\nFROM HOA_DON\nWHERE SoLuong >= 2;',
    },
    {
      id: 'XE-Q05',
      databaseId: 'QL_XE',
      level: 'Thông hiểu',
      order: 5,
      question: 'Để hiển thị danh sách các xe kèm tên loại xe tương ứng, điều kiện kết nối bảng (JOIN ON) nào sau đây là chính xác?',
      options: [
        { key: 'A', text: 'FROM DANH_MUC_XE x JOIN LOAI_XE l ON x.MaXe = l.MaLoai' },
        { key: 'B', text: 'FROM DANH_MUC_XE x JOIN LOAI_XE l ON x.MaLoai = l.MaLoai' },
        { key: 'C', text: 'FROM DANH_MUC_XE x JOIN LOAI_XE l ON x.TenXe = l.LoaiXe' },
        { key: 'D', text: 'FROM DANH_MUC_XE x JOIN LOAI_XE l ON x.MaLoai = l.LoaiXe' },
      ],
      correctAnswer: 'B',
      explanation: 'Trường liên kết khóa ngoại giữa DANH_MUC_XE và LOAI_XE là MaLoai, vì vậy điều kiện chuẩn là ON x.MaLoai = l.MaLoai.',
      relatedSql: 'SELECT x.MaXe, x.TenXe, l.LoaiXe\nFROM DANH_MUC_XE x\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai;',
    },
    {
      id: 'XE-Q06',
      databaseId: 'QL_XE',
      level: 'Thông hiểu',
      order: 6,
      question: 'Câu lệnh SQL nào tính thành tiền của từng hóa đơn (Thành tiền = Số lượng * Đơn giá)?',
      options: [
        { key: 'A', text: 'SELECT SoHD, MaXe, (SoLuong * DonGia) AS ThanhTien FROM HOA_DON;' },
        { key: 'B', text: 'SELECT SoHD, MaXe, SUM(SoLuong * DonGia) FROM HOA_DON;' },
        { key: 'C', text: 'SELECT SoHD, MaXe, (SoLuong + DonGia) AS ThanhTien FROM HOA_DON;' },
        { key: 'D', text: 'SELECT SoHD, MaXe, MULTIPLY(SoLuong, DonGia) FROM HOA_DON;' },
      ],
      correctAnswer: 'A',
      explanation: 'Trong SQL, phép toán nhân trên từng hàng được thực hiện trực tiếp bằng toán tử sao (*) giữa các cột số học: (SoLuong * DonGia) AS ThanhTien.',
      relatedSql: 'SELECT SoHD, MaXe, SoLuong, DonGia, (SoLuong * DonGia) AS ThanhTien\nFROM HOA_DON;',
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'XE-Q07',
      databaseId: 'QL_XE',
      level: 'Vận dụng',
      order: 7,
      question: 'Câu lệnh SQL nào sau đây tính tổng số xe bán được và tổng doanh thu thu được theo từng Loại xe (LoaiXe)?',
      options: [
        {
          key: 'A',
          text: `SELECT l.LoaiXe, SUM(hd.SoLuong) AS TongBan, SUM(hd.SoLuong * hd.DonGia) AS DoanhThu\nFROM LOAI_XE l\nJOIN DANH_MUC_XE x ON l.MaLoai = x.MaLoai\nJOIN HOA_DON hd ON x.MaXe = hd.MaXe\nGROUP BY l.LoaiXe;`
        },
        {
          key: 'B',
          text: `SELECT l.LoaiXe, COUNT(hd.SoLuong), AVG(hd.DonGia)\nFROM LOAI_XE l, HOA_DON hd\nGROUP BY l.LoaiXe;`
        },
        {
          key: 'C',
          text: `SELECT l.LoaiXe, (hd.SoLuong * hd.DonGia) AS DoanhThu\nFROM LOAI_XE l\nJOIN DANH_MUC_XE x ON l.MaLoai = x.MaLoai;`
        },
        {
          key: 'D',
          text: `SELECT l.LoaiXe, SUM(x.MaXe) FROM LOAI_XE l GROUP BY l.LoaiXe;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Cần nối 3 bảng LOAI_XE -> DANH_MUC_XE -> HOA_DON, sau đó dùng GROUP BY l.LoaiXe kết hợp hàm gộp SUM(hd.SoLuong) và SUM(hd.SoLuong * hd.DonGia).',
      relatedSql: `SELECT l.LoaiXe, SUM(hd.SoLuong) AS TongBan, SUM(hd.SoLuong * hd.DonGia) AS DoanhThu\nFROM LOAI_XE l\nJOIN DANH_MUC_XE x ON l.MaLoai = x.MaLoai\nJOIN HOA_DON hd ON x.MaXe = hd.MaXe\nGROUP BY l.LoaiXe;`,
    },
    {
      id: 'XE-Q08',
      databaseId: 'QL_XE',
      level: 'Vận dụng',
      order: 8,
      question: 'Để lọc các dòng xe có tổng số lượng bán từ 3 chiếc trở lên sau khi gom nhóm (GROUP BY x.MaXe, x.TenXe), cần dùng mệnh đề nào?',
      options: [
        { key: 'A', text: 'WHERE SUM(hd.SoLuong) >= 3' },
        { key: 'B', text: 'HAVING SUM(hd.SoLuong) >= 3' },
        { key: 'C', text: 'ORDER BY SUM(hd.SoLuong) >= 3' },
        { key: 'D', text: 'FILTER SUM(hd.SoLuong) >= 3' },
      ],
      correctAnswer: 'B',
      explanation: 'Để lọc điều kiện trên giá trị của hàm gộp như SUM sau GROUP BY, bắt buộc phải dùng mệnh đề HAVING, mệnh đề WHERE không thể dùng với hàm gộp.',
      relatedSql: `SELECT x.MaXe, x.TenXe, SUM(hd.SoLuong) AS TongBan\nFROM DANH_MUC_XE x\nJOIN HOA_DON hd ON x.MaXe = hd.MaXe\nGROUP BY x.MaXe, x.TenXe\nHAVING SUM(hd.SoLuong) >= 3;`,
    },
    {
      id: 'XE-Q09',
      databaseId: 'QL_XE',
      level: 'Vận dụng',
      order: 9,
      question: 'Để tìm danh sách các dòng xe trong danh mục chưa từng phát sinh bất kỳ hóa đơn bán nào, câu lệnh SQL nào sau đây là chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT x.MaXe, x.TenXe\nFROM DANH_MUC_XE x\nLEFT JOIN HOA_DON hd ON x.MaXe = hd.MaXe\nWHERE hd.SoHD IS NULL;`
        },
        {
          key: 'B',
          text: `SELECT x.MaXe, x.TenXe\nFROM DANH_MUC_XE x\nINNER JOIN HOA_DON hd ON x.MaXe = hd.MaXe\nWHERE hd.SoLuong = 0;`
        },
        {
          key: 'C',
          text: `SELECT x.MaXe, x.TenXe\nFROM DANH_MUC_XE x\nWHERE x.MaXe IN (SELECT MaXe FROM HOA_DON);`
        },
        {
          key: 'D',
          text: `SELECT * FROM DANH_MUC_XE WHERE SoLuong IS NULL;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Phép nối ngoài LEFT JOIN giữ lại tất cả các xe trong DANH_MUC_XE; với những xe chưa bán được chiếc nào thì cột của HOA_DON sẽ là NULL, do đó WHERE hd.SoHD IS NULL sẽ lọc ra chính xác các xe này (kết quả là xe X09).',
      relatedSql: `SELECT x.MaXe, x.TenXe, l.LoaiXe\nFROM DANH_MUC_XE x\nJOIN LOAI_XE l ON x.MaLoai = l.MaLoai\nLEFT JOIN HOA_DON hd ON x.MaXe = hd.MaXe\nWHERE hd.SoHD IS NULL;`,
    },
    {
      id: 'XE-Q10',
      databaseId: 'QL_XE',
      level: 'Vận dụng',
      order: 10,
      question: 'Để thêm một dòng xe mới: Mã xe \'X10\', tên \'VinFast Evo 200\', thuộc loại xe \'L04\' (Xe máy điện) vào bảng DANH_MUC_XE, câu lệnh nào đúng chuẩn cú pháp SQL?',
      options: [
        { key: 'A', text: `INSERT INTO DANH_MUC_XE (MaXe, TenXe, MaLoai) VALUES ('X10', 'VinFast Evo 200', 'L04');` },
        { key: 'B', text: `ADD RECORD TO DANH_MUC_XE ('X10', 'VinFast Evo 200', 'L04');` },
        { key: 'C', text: `INSERT DANH_MUC_XE SET MaXe='X10', TenXe='VinFast Evo 200', MaLoai='L04';` },
        { key: 'D', text: `UPDATE DANH_MUC_XE SET MaXe = 'X10' WHERE TenXe = 'VinFast Evo 200';` },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp chuẩn để thêm bản ghi mới trong SQL là INSERT INTO <ten_bang> (danh_sach_cot) VALUES (danh_sach_gia_tri).',
      relatedSql: `INSERT INTO DANH_MUC_XE (MaXe, TenXe, MaLoai)\nVALUES ('X10', 'VinFast Evo 200', 'L04');`,
    },
  ],

  // ==========================================
  // 7. CSDL QL_VANG (3 Bảng - Loại Vàng, Sản Phẩm, Phiếu Bán)
  // ==========================================
  QL_VANG: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'VANG-Q01',
      databaseId: 'QL_VANG',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong CSDL QL_VANG, trường MaLoai trong bảng SAN_PHAM đóng vai trò gì?',
      options: [
        { key: 'A', text: 'Khóa chính (PRIMARY KEY) định danh duy nhất cho từng sản phẩm' },
        { key: 'B', text: 'Khóa ngoại (FOREIGN KEY) tham chiếu đến khóa chính MaLoai của bảng LOAI_VANG' },
        { key: 'C', text: 'Thuộc tính chỉ mục không liên quan đến quan hệ giữa các bảng' },
        { key: 'D', text: 'Khóa chính phức hợp kết hợp cùng trường MaSP' },
      ],
      correctAnswer: 'B',
      explanation: 'MaLoai trong SAN_PHAM là khóa ngoại (FOREIGN KEY) tham chiếu đến trường MaLoai của bảng LOAI_VANG để liên kết sản phẩm với loại vàng cụ thể.',
      relatedSql: 'SELECT sp.MaSP, sp.TenSP, sp.MaLoai, lv.TenLoai\nFROM SAN_PHAM sp\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai;',
    },
    {
      id: 'VANG-Q02',
      databaseId: 'QL_VANG',
      level: 'Nhận biết',
      order: 2,
      question: 'Để lấy danh sách tất cả các loại vàng trong bảng LOAI_VANG sắp xếp giảm dần theo giá niêm yết (GiaNiemYet), câu lệnh SQL nào sau đây là đúng?',
      options: [
        { key: 'A', text: 'SELECT * FROM LOAI_VANG ORDER BY GiaNiemYet DESC;' },
        { key: 'B', text: 'SELECT * FROM LOAI_VANG SORT BY GiaNiemYet DOWN;' },
        { key: 'C', text: 'SELECT ALL FROM LOAI_VANG ORDER BY GiaNiemYet ASC;' },
        { key: 'D', text: 'SELECT MaLoai, TenLoai FROM LOAI_VANG GROUP BY GiaNiemYet DESC;' },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề ORDER BY kết hợp từ khóa DESC sắp xếp tập kết quả theo thứ tự giảm dần của cột GiaNiemYet.',
      relatedSql: 'SELECT MaLoai, TenLoai, GiaNiemYet\nFROM LOAI_VANG\nORDER BY GiaNiemYet DESC;',
    },
    {
      id: 'VANG-Q03',
      databaseId: 'QL_VANG',
      level: 'Nhận biết',
      order: 3,
      question: 'Trong bảng SAN_PHAM, ràng buộc "CHECK(TrongLuong > 0)" và "CHECK(TienCong >= 0)" có ý nghĩa gì trong thiết kế CSDL?',
      options: [
        { key: 'A', text: 'Tự động gán giá trị mặc định nếu người dùng nhập thiếu' },
        { key: 'B', text: 'Đảm bảo trọng lượng sản phẩm phải lớn hơn 0 và tiền công chế tác không được âm (>= 0)' },
        { key: 'C', text: 'Giới hạn trọng lượng sản phẩm vàng tối đa không vượt quá 10 chỉ' },
        { key: 'D', text: 'Tự động tính toán giá bán của sản phẩm dựa trên bảng LOAI_VANG' },
      ],
      correctAnswer: 'B',
      explanation: 'Ràng buộc CHECK kiểm tra tính hợp lệ của dữ liệu trước khi lưu vào CSDL: trọng lượng vàng phải dương (>0) và tiền công không âm (>=0).',
      relatedSql: 'SELECT MaSP, TenSP, TrongLuong, TienCong\nFROM SAN_PHAM\nWHERE TrongLuong > 0 AND TienCong >= 0;',
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'VANG-Q04',
      databaseId: 'QL_VANG',
      level: 'Thông hiểu',
      order: 4,
      question: 'Cho câu lệnh: SELECT COUNT(*) FROM SAN_PHAM WHERE TienCong = 0; Kết quả trả về của câu lệnh này thể hiện điều gì?',
      options: [
        { key: 'A', text: 'Tổng số tiền công của tất cả sản phẩm vàng trong tiệm' },
        { key: 'B', text: 'Số lượng sản phẩm không tính tiền công chế tác (như vàng miếng, vàng nhẫn trơn nguyên chất)' },
        { key: 'C', text: 'Số phiếu bán hàng có chiết khấu tiền công cho khách' },
        { key: 'D', text: 'Danh sách các mã loại vàng không có sản phẩm nào' },
      ],
      correctAnswer: 'B',
      explanation: 'Hàm COUNT(*) kết hợp điều kiện WHERE TienCong = 0 đếm số lượng mặt hàng trong danh mục có tiền công bằng 0 (như các sản phẩm vàng miếng SJC SP04, SP05).',
      relatedSql: 'SELECT COUNT(*) AS SoSPKhongTienCong\nFROM SAN_PHAM\nWHERE TienCong = 0;',
    },
    {
      id: 'VANG-Q05',
      databaseId: 'QL_VANG',
      level: 'Thông hiểu',
      order: 5,
      question: 'Để hiển thị danh sách sản phẩm gồm MaSP, TenSP kèm tên loại vàng TenLoai, câu lệnh nối bảng (JOIN) nào dưới đây là chính xác?',
      options: [
        { key: 'A', text: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai FROM SAN_PHAM sp JOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai;' },
        { key: 'B', text: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai FROM SAN_PHAM sp JOIN LOAI_VANG lv ON sp.MaSP = lv.MaLoai;' },
        { key: 'C', text: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai FROM SAN_PHAM sp, LOAI_VANG lv WHERE sp.TenSP = lv.TenLoai;' },
        { key: 'D', text: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai FROM SAN_PHAM sp JOIN LOAI_VANG lv ON sp.TrongLuong = lv.GiaNiemYet;' },
      ],
      correctAnswer: 'A',
      explanation: 'Khóa ngoại liên kết giữa hai bảng SAN_PHAM và LOAI_VANG là trường MaLoai, do đó điều kiện nối bảng chuẩn xác là ON sp.MaLoai = lv.MaLoai.',
      relatedSql: 'SELECT sp.MaSP, sp.TenSP, lv.TenLoai\nFROM SAN_PHAM sp\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai;',
    },
    {
      id: 'VANG-Q06',
      databaseId: 'QL_VANG',
      level: 'Thông hiểu',
      order: 6,
      question: 'Cho câu truy vấn: SELECT MaLoai, COUNT(*) AS SoLuongSP FROM SAN_PHAM GROUP BY MaLoai HAVING COUNT(*) >= 3; Mệnh đề HAVING trong câu lệnh này có tác dụng gì?',
      options: [
        { key: 'A', text: 'Lọc các sản phẩm đơn lẻ có số lượng tồn kho lớn hơn hoặc bằng 3' },
        { key: 'B', text: 'Lọc các nhóm loại vàng có từ 3 sản phẩm trở lên trong danh mục' },
        { key: 'C', text: 'Sắp xếp danh sách loại vàng theo số lượng giảm dần' },
        { key: 'D', text: 'Giới hạn số bản ghi kết quả trả về tối đa là 3' },
      ],
      correctAnswer: 'B',
      explanation: 'Mệnh đề HAVING lọc điều kiện trên tập hợp nhóm sau khi thực hiện GROUP BY; ở đây lọc các nhóm MaLoai có số sản phẩm COUNT(*) >= 3.',
      relatedSql: 'SELECT MaLoai, COUNT(*) AS SoLuongSP\nFROM SAN_PHAM\nGROUP BY MaLoai\nHAVING COUNT(*) >= 3;',
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'VANG-Q07',
      databaseId: 'QL_VANG',
      level: 'Vận dụng',
      order: 7,
      question: 'Để tính cột "Thành tiền" cho mỗi phiếu bán hàng bằng công thức SoLuong * DonGiaBan, câu lệnh SQL nào hiển thị đúng và chuẩn cú pháp?',
      options: [
        {
          key: 'A',
          text: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, pb.SoLuong, pb.DonGiaBan, (pb.SoLuong * pb.DonGiaBan) AS ThanhTien\nFROM PHIEU_BAN pb\nJOIN SAN_PHAM sp ON pb.MaSP = sp.MaSP;`
        },
        {
          key: 'B',
          text: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, pb.SoLuong, pb.DonGiaBan, SUM(pb.SoLuong * pb.DonGiaBan)\nFROM PHIEU_BAN pb;`
        },
        {
          key: 'C',
          text: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, (SoLuong + DonGiaBan) AS ThanhTien\nFROM PHIEU_BAN pb\nJOIN SAN_PHAM sp ON pb.SoPhieu = sp.MaSP;`
        },
        {
          key: 'D',
          text: `SELECT * FROM PHIEU_BAN WHERE (SoLuong * DonGiaBan) AS ThanhTien;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Biểu thức tính toán (pb.SoLuong * pb.DonGiaBan) AS ThanhTien trong mệnh đề SELECT tính ra thành tiền cho từng phiếu bán hàng khi nối với bảng SAN_PHAM.',
      relatedSql: `SELECT pb.SoPhieu, pb.NgayBan, sp.TenSP, pb.SoLuong, pb.DonGiaBan, (pb.SoLuong * pb.DonGiaBan) AS ThanhTien\nFROM PHIEU_BAN pb\nJOIN SAN_PHAM sp ON pb.MaSP = sp.MaSP;`,
    },
    {
      id: 'VANG-Q08',
      databaseId: 'QL_VANG',
      level: 'Vận dụng',
      order: 8,
      question: 'Cần viết truy vấn thống kê tổng doanh thu bán thu được theo từng Loại vàng (hiển thị TenLoai và TongDoanhThu), câu lệnh SQL nào sau đây là chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT lv.TenLoai, SUM(pb.SoLuong * pb.DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG lv\nJOIN SAN_PHAM sp ON lv.MaLoai = sp.MaLoai\nJOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nGROUP BY lv.MaLoai, lv.TenLoai\nORDER BY TongDoanhThu DESC;`
        },
        {
          key: 'B',
          text: `SELECT lv.TenLoai, COUNT(pb.DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG lv\nJOIN SAN_PHAM sp ON lv.MaLoai = sp.MaLoai\nGROUP BY lv.TenLoai;`
        },
        {
          key: 'C',
          text: `SELECT lv.TenLoai, (pb.SoLuong * pb.DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG lv\nJOIN PHIEU_BAN pb ON lv.MaLoai = pb.MaSP;`
        },
        {
          key: 'D',
          text: `SELECT TenLoai, AVG(DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG\nGROUP BY TenLoai;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Nối 3 bảng LOAI_VANG -> SAN_PHAM -> PHIEU_BAN, thực hiện GROUP BY theo loại vàng và áp dụng hàm SUM(pb.SoLuong * pb.DonGiaBan) để tính tổng doanh thu bán.',
      relatedSql: `SELECT lv.TenLoai, SUM(pb.SoLuong * pb.DonGiaBan) AS TongDoanhThu\nFROM LOAI_VANG lv\nJOIN SAN_PHAM sp ON lv.MaLoai = sp.MaLoai\nJOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nGROUP BY lv.MaLoai, lv.TenLoai\nORDER BY TongDoanhThu DESC;`,
    },
    {
      id: 'VANG-Q09',
      databaseId: 'QL_VANG',
      level: 'Vận dụng',
      order: 9,
      question: 'Để tìm các sản phẩm vàng trong danh mục SAN_PHAM chưa từng phát sinh bất kỳ phiếu bán nào trong bảng PHIEU_BAN, câu truy vấn nào sau đây trả về kết quả đúng?',
      options: [
        {
          key: 'A',
          text: `SELECT sp.MaSP, sp.TenSP\nFROM SAN_PHAM sp\nLEFT JOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nWHERE pb.SoPhieu IS NULL;`
        },
        {
          key: 'B',
          text: `SELECT sp.MaSP, sp.TenSP\nFROM SAN_PHAM sp\nINNER JOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nWHERE pb.SoLuong = 0;`
        },
        {
          key: 'C',
          text: `SELECT sp.MaSP, sp.TenSP\nFROM SAN_PHAM sp\nWHERE sp.MaSP IN (SELECT MaSP FROM PHIEU_BAN);`
        },
        {
          key: 'D',
          text: `SELECT * FROM SAN_PHAM WHERE SoLuong IS NULL;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Phép nối ngoài LEFT JOIN giữ lại toàn bộ sản phẩm trong SAN_PHAM; những sản phẩm chưa từng xuất hiện trong PHIEU_BAN sẽ có giá trị NULL ở các cột của PHIEU_BAN, vì vậy WHERE pb.SoPhieu IS NULL sẽ lọc ra chính xác các sản phẩm này (kết quả là SP05 và SP10).',
      relatedSql: `SELECT sp.MaSP, sp.TenSP, lv.TenLoai, sp.TrongLuong\nFROM SAN_PHAM sp\nJOIN LOAI_VANG lv ON sp.MaLoai = lv.MaLoai\nLEFT JOIN PHIEU_BAN pb ON sp.MaSP = pb.MaSP\nWHERE pb.SoPhieu IS NULL;`,
    },
    {
      id: 'VANG-Q10',
      databaseId: 'QL_VANG',
      level: 'Vận dụng',
      order: 10,
      question: 'Để thêm một phiếu bán hàng mới: Số phiếu \'PB11\', Mã SP \'SP03\', Ngày bán \'2024-05-20\', Số lượng 2 chiếc, Đơn giá bán 42.000.000 đồng vào bảng PHIEU_BAN, câu lệnh nào đúng chuẩn cú pháp SQL?',
      options: [
        { key: 'A', text: `INSERT INTO PHIEU_BAN (SoPhieu, MaSP, NgayBan, SoLuong, DonGiaBan) VALUES ('PB11', 'SP03', '2024-05-20', 2, 42000000);` },
        { key: 'B', text: `ADD RECORD TO PHIEU_BAN ('PB11', 'SP03', '2024-05-20', 2, 42000000);` },
        { key: 'C', text: `INSERT PHIEU_BAN SET SoPhieu='PB11', MaSP='SP03', NgayBan='2024-05-20', SoLuong=2;` },
        { key: 'D', text: `UPDATE PHIEU_BAN SET SoPhieu = 'PB11' WHERE MaSP = 'SP03';` },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp chuẩn để thêm bản ghi mới trong SQL là: INSERT INTO <ten_bang> (danh_sach_cot) VALUES (danh_sach_gia_tri).',
      relatedSql: `INSERT INTO PHIEU_BAN (SoPhieu, MaSP, NgayBan, SoLuong, DonGiaBan)\nVALUES ('PB11', 'SP03', '2024-05-20', 2, 42000000);`,
    },
  ],

  // ==========================================
  // 8. CSDL QL_CANBO (3 Bảng - Quản Lý Cán Bộ)
  // ==========================================
  QL_CANBO: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'CB-Q01',
      databaseId: 'QL_CANBO',
      level: 'Nhận biết',
      order: 1,
      question: 'Trong mô hình quan hệ CSDL QL_Canbo, trường MaPh trong bảng CANBO đóng vai trò gì?',
      options: [
        { key: 'A', text: 'Là khóa chính (Primary Key) của bảng CANBO' },
        { key: 'B', text: 'Là khóa ngoại (Foreign Key) tham chiếu đến khóa chính MaPh của bảng PHONG' },
        { key: 'C', text: 'Là trường dữ liệu chỉ mục không bắt buộc' },
        { key: 'D', text: 'Là khóa ứng viên thứ cấp' },
      ],
      correctAnswer: 'B',
      explanation: 'MaPh trong CANBO liên kết bản ghi cán bộ với đơn vị phòng ban tương ứng trong bảng PHONG, do đó nó là khóa ngoại (FK).',
      relatedSql: `SELECT cb.MaCB, cb.Ten, cb.MaPh, p.TenPh\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh;`,
    },
    {
      id: 'CB-Q02',
      databaseId: 'QL_CANBO',
      level: 'Nhận biết',
      order: 2,
      question: 'Để trích xuất danh sách các mã phòng ban (MaPh) duy nhất, không trùng lặp từ bảng CANBO, từ khóa nào sau đây được đặt ngay sau SELECT?',
      options: [
        { key: 'A', text: 'UNIQUE' },
        { key: 'B', text: 'DISTINCT' },
        { key: 'C', text: 'DIFFERENT' },
        { key: 'D', text: 'NO_DUPLICATE' },
      ],
      correctAnswer: 'B',
      explanation: 'Từ khóa DISTINCT trong câu lệnh SELECT DISTINCT MaPh FROM CANBO; loại bỏ mọi giá trị lặp lại trong tập kết quả trả về.',
      relatedSql: `SELECT DISTINCT MaPh\nFROM CANBO;`,
    },
    {
      id: 'CB-Q03',
      databaseId: 'QL_CANBO',
      level: 'Nhận biết',
      order: 3,
      question: 'Mệnh đề ORDER BY Luong DESC ở cuối câu truy vấn có tác dụng gì đối với bảng dữ liệu CANBO?',
      options: [
        { key: 'A', text: 'Sắp xếp danh sách cán bộ theo mức lương tăng dần từ thấp đến cao' },
        { key: 'B', text: 'Sắp xếp danh sách cán bộ theo mức lương giảm dần từ cao xuống thấp' },
        { key: 'C', text: 'Tính tổng mức lương của toàn bộ cán bộ' },
        { key: 'D', text: 'Chỉ hiển thị các cán bộ có mức lương cao nhất' },
      ],
      correctAnswer: 'B',
      explanation: 'Từ khóa DESC (viết tắt của Descending) chỉ định trật tự sắp xếp giảm dần theo cột Luong từ mức lương lớn nhất đến nhỏ nhất.',
      relatedSql: `SELECT MaCB, Ten, Luong\nFROM CANBO\nORDER BY Luong DESC;`,
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'CB-Q04',
      databaseId: 'QL_CANBO',
      level: 'Thông hiểu',
      order: 4,
      question: 'Cho câu lệnh SQL sau:\nSELECT cb.Ten, p.TenPh, cb.Luong\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nWHERE p.TenPh = \'Phòng Kỹ thuật\';\nCâu lệnh trên thực hiện công việc gì?',
      sqlSnippet: `SELECT cb.Ten, p.TenPh, cb.Luong\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nWHERE p.TenPh = 'Phòng Kỹ thuật';`,
      options: [
        { key: 'A', text: 'Đổi tên phòng ban của cán bộ thành Phòng Kỹ thuật' },
        { key: 'B', text: 'Liệt kê danh sách tên cán bộ, tên phòng ban và lương của các nhân sự thuộc "Phòng Kỹ thuật"' },
        { key: 'C', text: 'Đếm số lượng cán bộ kỹ thuật trong cơ quan' },
        { key: 'D', text: 'Tính lương trung bình của Phòng Kỹ thuật' },
      ],
      correctAnswer: 'B',
      explanation: 'Câu lệnh kết nối CANBO và PHONG qua MaPh, sau đó dùng điều kiện WHERE p.TenPh = \'Phòng Kỹ thuật\' để trích xuất các cán bộ làm việc tại phòng ban này.',
      relatedSql: `SELECT cb.Ten, p.TenPh, cb.Luong\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nWHERE p.TenPh = 'Phòng Kỹ thuật';`,
    },
    {
      id: 'CB-Q05',
      databaseId: 'QL_CANBO',
      level: 'Thông hiểu',
      order: 5,
      question: 'Cần lọc các cán bộ có mức lương trong khoảng từ 15.000.000 đồng đến 20.000.000 đồng (bao gồm cả hai mốc này), mệnh đề WHERE nào sau đây là chuẩn xác?',
      options: [
        { key: 'A', text: 'WHERE Luong BETWEEN 15000000 AND 20000000' },
        { key: 'B', text: 'WHERE Luong IN (15000000, 20000000)' },
        { key: 'C', text: 'WHERE Luong >= 15000000 OR Luong <= 20000000' },
        { key: 'D', text: 'WHERE Luong = 15000000 AND Luong = 20000000' },
      ],
      correctAnswer: 'A',
      explanation: 'Toán tử BETWEEN 15000000 AND 20000000 bao gồm cả hai mốc biên, tương đương điều kiện (Luong >= 15000000 AND Luong <= 20000000).',
      relatedSql: `SELECT MaCB, Ten, Luong\nFROM CANBO\nWHERE Luong BETWEEN 15000000 AND 20000000;`,
    },
    {
      id: 'CB-Q06',
      databaseId: 'QL_CANBO',
      level: 'Thông hiểu',
      order: 6,
      question: 'Câu lệnh SQL sau đây trả về kết quả gì?\nSELECT MaPh, COUNT(*) AS SoLuong, ROUND(AVG(Luong), 0) AS LuongTB\nFROM CANBO\nGROUP BY MaPh;',
      sqlSnippet: `SELECT MaPh, COUNT(*) AS SoLuong, ROUND(AVG(Luong), 0) AS LuongTB\nFROM CANBO\nGROUP BY MaPh;`,
      options: [
        { key: 'A', text: 'Tổng lương và số lượng của toàn bộ cán bộ công ty' },
        { key: 'B', text: 'Thống kê số lượng cán bộ và mức lương bình quân theo từng phòng ban' },
        { key: 'C', text: 'Danh sách cán bộ có mức lương cao nhất theo mỗi phòng' },
        { key: 'D', text: 'Cán bộ có mức lương bằng mức trung bình của phòng ban' },
      ],
      correctAnswer: 'B',
      explanation: 'Mệnh đề GROUP BY MaPh nhóm dữ liệu theo từng phòng ban, COUNT(*) đếm nhân sự mỗi phòng và AVG(Luong) tính lương bình quân của phòng đó.',
      relatedSql: `SELECT MaPh, COUNT(*) AS SoLuong, ROUND(AVG(Luong), 0) AS LuongTB\nFROM CANBO\nGROUP BY MaPh;`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'CB-Q07',
      databaseId: 'QL_CANBO',
      level: 'Vận dụng',
      order: 7,
      question: 'Cần hiển thị thông tin: Mã CB, Tên cán bộ, Tên phòng ban, Lương, Trình độ học vấn của các cán bộ có trình độ \'Tiến sĩ\' hoặc \'Thạc sĩ\', câu lệnh SQL nào sau đây là chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT cb.MaCB, cb.Ten, p.TenPh, cb.Luong, td.TrinhDoHV\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nJOIN TRINHDOVANHOA td ON cb.MaCB = td.MaCB\nWHERE td.TrinhDoHV IN ('Tiến sĩ', 'Thạc sĩ');`
        },
        {
          key: 'B',
          text: `SELECT cb.MaCB, cb.Ten, p.TenPh, cb.Luong, td.TrinhDoHV\nFROM CANBO cb\nWHERE TrinhDoHV = 'Tiến sĩ' AND TrinhDoHV = 'Thạc sĩ';`
        },
        {
          key: 'C',
          text: `SELECT cb.MaCB, cb.Ten, p.TenPh\nFROM PHONG p JOIN CANBO cb ON p.MaPh = cb.MaPh\nWHERE td.TrinhDoHV = 'Thạc sĩ';`
        },
        {
          key: 'D',
          text: `SELECT * FROM CANBO WHERE MaCB IN (SELECT MaPh FROM TRINHDOVANHOA);`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Kết nối liên bảng CANBO -> PHONG qua MaPh và CANBO -> TRINHDOVANHOA qua MaCB, kết hợp điều kiện WHERE td.TrinhDoHV IN (\'Tiến sĩ\', \'Thạc sĩ\').',
      relatedSql: `SELECT cb.MaCB, cb.Ten, p.TenPh, cb.Luong, td.TrinhDoHV\nFROM CANBO cb\nJOIN PHONG p ON cb.MaPh = p.MaPh\nJOIN TRINHDOVANHOA td ON cb.MaCB = td.MaCB\nWHERE td.TrinhDoHV IN ('Tiến sĩ', 'Thạc sĩ');`,
    },
    {
      id: 'CB-Q08',
      databaseId: 'QL_CANBO',
      level: 'Vận dụng',
      order: 8,
      question: 'Để thống kê tổng quỹ lương chi trả theo từng phòng ban (kể cả phòng ban chưa có cán bộ nào công tác) và sắp xếp tổng lương giảm dần, câu lệnh nào đúng?',
      options: [
        {
          key: 'A',
          text: `SELECT p.MaPh, p.TenPh, COUNT(cb.MaCB) AS SoCanBo, COALESCE(SUM(cb.Luong), 0) AS TongLuong\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nGROUP BY p.MaPh, p.TenPh\nORDER BY TongLuong DESC;`
        },
        {
          key: 'B',
          text: `SELECT p.MaPh, p.TenPh, SUM(cb.Luong) AS TongLuong\nFROM PHONG p\nINNER JOIN CANBO cb ON p.MaPh = cb.MaPh\nORDER BY TongLuong DESC;`
        },
        {
          key: 'C',
          text: `SELECT MaPh, SUM(Luong) FROM CANBO GROUP BY MaPh;`
        },
        {
          key: 'D',
          text: `SELECT p.MaPh, SUM(cb.Luong) FROM CANBO cb LEFT JOIN PHONG p ON cb.MaPh = p.MaPh;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng LEFT JOIN từ bảng PHONG sang CANBO để giữ lại phòng ban chưa có nhân sự (như PH05), kết hợp GROUP BY theo phòng và COALESCE để hiển thị quỹ lương là 0 thay vì NULL.',
      relatedSql: `SELECT p.MaPh, p.TenPh, COUNT(cb.MaCB) AS SoCanBo, COALESCE(SUM(cb.Luong), 0) AS TongLuong\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nGROUP BY p.MaPh, p.TenPh\nORDER BY TongLuong DESC;`,
    },
    {
      id: 'CB-Q09',
      databaseId: 'QL_CANBO',
      level: 'Vận dụng',
      order: 9,
      question: 'Muốn tìm danh sách các phòng ban trong cơ quan hiện chưa được bố trí cán bộ nào làm việc, câu truy vấn nào sau đây mang lại kết quả chuẩn xác?',
      options: [
        {
          key: 'A',
          text: `SELECT p.MaPh, p.TenPh, p.DiaChi\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nWHERE cb.MaCB IS NULL;`
        },
        {
          key: 'B',
          text: `SELECT p.MaPh, p.TenPh FROM PHONG p WHERE p.MaPh = 0;`
        },
        {
          key: 'C',
          text: `SELECT p.MaPh, p.TenPh FROM PHONG p JOIN CANBO cb ON p.MaPh = cb.MaPh WHERE cb.Luong = 0;`
        },
        {
          key: 'D',
          text: `SELECT * FROM PHONG WHERE MaPh NOT NULL;`
        },
      ],
      correctAnswer: 'A',
      explanation: 'LEFT JOIN giữ lại tất cả phòng ban trong bảng PHONG; các phòng ban không có cán bộ nào sẽ có giá trị cb.MaCB bằng NULL. Do đó, điều kiện WHERE cb.MaCB IS NULL lọc ra đúng phòng này (kết quả là PH05).',
      relatedSql: `SELECT p.MaPh, p.TenPh, p.DiaChi\nFROM PHONG p\nLEFT JOIN CANBO cb ON p.MaPh = cb.MaPh\nWHERE cb.MaCB IS NULL;`,
    },
    {
      id: 'CB-Q10',
      databaseId: 'QL_CANBO',
      level: 'Vận dụng',
      order: 10,
      question: 'Để tiếp nhận thêm một cán bộ mới: Mã \'CB12\', Tên \'Vũ Hải Đăng\', Ngày sinh \'1994-11-20\', Lương 16.000.000 đồng vào làm việc tại phòng \'PH03\', câu lệnh SQL nào chuẩn xác?',
      options: [
        { key: 'A', text: `INSERT INTO CANBO (MaCB, Ten, NgaySinh, Luong, MaPh) VALUES ('CB12', 'Vũ Hải Đăng', '1994-11-20', 16000000, 'PH03');` },
        { key: 'B', text: `ADD INTO CANBO ('CB12', 'Vũ Hải Đăng', '1994-11-20', 16000000, 'PH03');` },
        { key: 'C', text: `INSERT CANBO SET MaCB='CB12', Ten='Vũ Hải Đăng', Luong=16000000;` },
        { key: 'D', text: `UPDATE CANBO ADD RECORD ('CB12', 'Vũ Hải Đăng', 'PH03');` },
      ],
      correctAnswer: 'A',
      explanation: 'Cú pháp chuẩn trong chuẩn SQL để thêm một bản ghi mới là INSERT INTO <tên_bảng> (danh_sách_cột) VALUES (danh_sách_giá_trị).',
      relatedSql: `INSERT INTO CANBO (MaCB, Ten, NgaySinh, Luong, MaPh)\nVALUES ('CB12', 'Vũ Hải Đăng', '1994-11-20', 16000000, 'PH03');`,
    },
  ],

  // ==========================================
  // 9. CSDL QL_TV (4 Bảng - Quản Lý Thư Viện)
  // ==========================================
  QL_TV: [
    // --- 3 CÂU NHẬN BIẾT ---
    {
      id: 'TV-Q01',
      databaseId: 'QL_TV',
      level: 'Nhận biết',
      order: 1,
      question: 'Câu lệnh SQL nào sau đây hiển thị danh sách tất cả các độc giả trong bảng DOCGIA?',
      options: [
        { key: 'A', text: 'SELECT * FROM DOCGIA;' },
        { key: 'B', text: 'GET DOCGIA ALL;' },
        { key: 'C', text: 'DISPLAY * IN DOCGIA;' },
        { key: 'D', text: 'SELECT ALL_RECORDS(DOCGIA);' },
      ],
      correctAnswer: 'A',
      explanation: 'Ký tự đại diện sao (*) trong SELECT * FROM DOCGIA trích xuất toàn bộ dữ liệu từ bảng DOCGIA.',
      relatedSql: 'SELECT *\nFROM DOCGIA;',
    },
    {
      id: 'TV-Q02',
      databaseId: 'QL_TV',
      level: 'Nhận biết',
      order: 2,
      question: 'Trong CSDL QL_TV, cột MaTG trong bảng SACH đóng vai trò gì trong mô hình quan hệ?',
      options: [
        { key: 'A', text: 'Là khóa chính của bảng SACH.' },
        { key: 'B', text: 'Là khóa ngoại (Foreign Key) tham chiếu đến khóa chính MaTG của bảng TACGIA.' },
        { key: 'C', text: 'Là một chỉ mục độc lập không có mối quan hệ với bảng khác.' },
        { key: 'D', text: 'Là trường dữ liệu lưu số điện thoại của tác giả.' },
      ],
      correctAnswer: 'B',
      explanation: 'Trường MaTG trong bảng SACH được khai báo là FOREIGN KEY (MaTG) REFERENCES TACGIA(MaTG) nhằm đảm bảo toàn vẹn tham chiếu giữa sách và tác giả sáng tác.',
      relatedSql: 'SELECT s.MaSach, s.TenSach, s.MaTG\nFROM SACH s;',
    },
    {
      id: 'TV-Q03',
      databaseId: 'QL_TV',
      level: 'Nhận biết',
      order: 3,
      question: 'Để lọc các phiếu mượn sách mà độc giả chưa trả sách (trường NgayTra chưa có dữ liệu), mệnh đề WHERE nào sau đây là đúng chuẩn SQL?',
      options: [
        { key: 'A', text: 'WHERE NgayTra = NULL' },
        { key: 'B', text: 'WHERE NgayTra IS NULL' },
        { key: 'C', text: 'WHERE NgayTra == ""' },
        { key: 'D', text: 'WHERE NgayTra EMPTY' },
      ],
      correctAnswer: 'B',
      explanation: 'Trong SQL chuẩn, toán tử IS NULL bắt buộc phải được sử dụng để kiểm tra giá trị vắng mặt hoặc chưa xác định (NULL). Phép so sánh = NULL sẽ luôn trả về UNKNOWN.',
      relatedSql: 'SELECT MaPhieu, MaDG, MaSach, NgayMuon\nFROM MUON_TRA\nWHERE NgayTra IS NULL;',
    },

    // --- 3 CÂU THÔNG HIỂU ---
    {
      id: 'TV-Q04',
      databaseId: 'QL_TV',
      level: 'Thông hiểu',
      order: 4,
      question: 'Câu truy vấn nào dưới đây hiển thị Tên sách (TenSach), Thể loại (TheLoai) cùng Tên tác giả (TenTG) từ hai bảng SACH và TACGIA?',
      options: [
        {
          key: 'A',
          text: `SELECT s.TenSach, s.TheLoai, tg.TenTG\nFROM SACH s\nJOIN TACGIA tg ON s.MaTG = tg.MaTG;`,
        },
        {
          key: 'B',
          text: `SELECT TenSach, TheLoai, TenTG FROM SACH, TACGIA WHERE SACH.MaSach = TACGIA.MaTG;`,
        },
        {
          key: 'C',
          text: `SELECT s.TenSach, tg.TenTG FROM SACH s UNION TACGIA tg;`,
        },
        {
          key: 'D',
          text: `SELECT TenSach, TenTG FROM SACH INNER JOIN TACGIA ON SACH.TenSach = TACGIA.TenTG;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Phép INNER JOIN nối bảng SACH và TACGIA trên điều kiện khóa ngoại s.MaTG = tg.MaTG để lấy đúng tên tác giả của từng cuốn sách.',
      relatedSql: `SELECT s.TenSach, s.TheLoai, tg.TenTG\nFROM SACH s\nJOIN TACGIA tg ON s.MaTG = tg.MaTG;`,
    },
    {
      id: 'TV-Q05',
      databaseId: 'QL_TV',
      level: 'Thông hiểu',
      order: 5,
      question: 'Để thống kê số lượng sách thuộc từng thể loại trong thư viện và sắp xếp số lượng giảm dần, câu lệnh nào sau đây là chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT TheLoai, COUNT(*) AS SoLuong\nFROM SACH\nGROUP BY TheLoai\nORDER BY SoLuong DESC;`,
        },
        {
          key: 'B',
          text: `SELECT TheLoai, SUM(MaSach) FROM SACH ORDER BY TheLoai;`,
        },
        {
          key: 'C',
          text: `SELECT TheLoai, COUNT(TheLoai) FROM SACH WHERE COUNT(*) > 0;`,
        },
        {
          key: 'D',
          text: `SELECT DISTINCT TheLoai, COUNT(*) FROM SACH;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Mệnh đề GROUP BY TheLoai nhóm các cuốn sách theo thể loại, kết hợp hàm gộp COUNT(*) và ORDER BY SoLuong DESC sắp xếp giảm dần.',
      relatedSql: `SELECT TheLoai, COUNT(*) AS SoLuong\nFROM SACH\nGROUP BY TheLoai\nORDER BY SoLuong DESC;`,
    },
    {
      id: 'TV-Q06',
      databaseId: 'QL_TV',
      level: 'Thông hiểu',
      order: 6,
      question: 'Trong bảng MUON_TRA, câu lệnh "SELECT * FROM MUON_TRA WHERE TrangThai = \'Quá hạn\';" trả về tập kết quả mang ý nghĩa gì?',
      options: [
        { key: 'A', text: 'Tất cả các phiếu mượn đã hoàn tất trả sách về kho.' },
        { key: 'B', text: 'Các lượt mượn sách đã quá thời hạn quy định của thư viện mà độc giả chưa hoàn trả.' },
        { key: 'C', text: 'Các độc giả bị hủy thẻ thư viện.' },
        { key: 'D', text: 'Các đầu sách đã hết hạn lưu hành trong thư viện.' },
      ],
      correctAnswer: 'B',
      explanation: 'Ràng buộc kiểm tra CHECK(TrangThai IN (\'Đang mượn\', \'Đã trả\', \'Quá hạn\')) phân loại tình trạng lưu thông sách. Giá trị \'Quá hạn\' biểu thị độc giả giữ sách vượt quá số ngày cho phép.',
      relatedSql: `SELECT * FROM MUON_TRA WHERE TrangThai = 'Quá hạn';`,
    },

    // --- 4 CÂU VẬN DỤNG ---
    {
      id: 'TV-Q07',
      databaseId: 'QL_TV',
      level: 'Vận dụng',
      order: 7,
      question: 'Để xem nhật ký mượn sách gồm Mã phiếu, Tên độc giả, Tên sách và Tên tác giả sáng tác, cần kết nối những bảng nào và với thứ tự khóa nào?',
      options: [
        {
          key: 'A',
          text: `FROM MUON_TRA mt JOIN DOCGIA dg ON mt.MaDG = dg.MaDG JOIN SACH s ON mt.MaSach = s.MaSach JOIN TACGIA tg ON s.MaTG = tg.MaTG`,
        },
        {
          key: 'B',
          text: `FROM MUON_TRA mt JOIN TACGIA tg ON mt.MaSach = tg.MaTG JOIN DOCGIA dg ON mt.MaDG = dg.MaDG`,
        },
        {
          key: 'C',
          text: `FROM DOCGIA dg, SACH s, TACGIA tg WHERE dg.MaDG = tg.MaTG`,
        },
        {
          key: 'D',
          text: `FROM SACH s JOIN DOCGIA dg ON s.MaSach = dg.MaDG JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Liên kết chuẩn xác: MUON_TRA nối với DOCGIA qua MaDG, nối với SACH qua MaSach, và từ SACH nối với TACGIA qua MaTG.',
      relatedSql: `SELECT mt.MaPhieu, dg.TenDG, s.TenSach, tg.TenTG\nFROM MUON_TRA mt\nJOIN DOCGIA dg ON mt.MaDG = dg.MaDG\nJOIN SACH s ON mt.MaSach = s.MaSach\nJOIN TACGIA tg ON s.MaTG = tg.MaTG;`,
    },
    {
      id: 'TV-Q08',
      databaseId: 'QL_TV',
      level: 'Vận dụng',
      order: 8,
      question: 'Yêu cầu: Thống kê số lần mượn sách của từng độc giả, đảm bảo giữ lại cả các bạn đọc chưa từng mượn cuốn sách nào (số lần mượn hiển thị là 0). Câu lệnh nào dưới đây đáp ứng chính xác?',
      options: [
        {
          key: 'A',
          text: `SELECT dg.MaDG, dg.TenDG, COUNT(mt.MaPhieu) AS SoLanMuon\nFROM DOCGIA dg\nLEFT JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG\nGROUP BY dg.MaDG, dg.TenDG\nORDER BY SoLanMuon DESC;`,
        },
        {
          key: 'B',
          text: `SELECT dg.MaDG, dg.TenDG, COUNT(mt.MaPhieu) AS SoLanMuon\nFROM DOCGIA dg\nINNER JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG\nGROUP BY dg.MaDG, dg.TenDG;`,
        },
        {
          key: 'C',
          text: `SELECT MaDG, COUNT(*) FROM MUON_TRA GROUP BY MaDG;`,
        },
        {
          key: 'D',
          text: `SELECT dg.MaDG, COUNT(mt.MaPhieu) FROM MUON_TRA mt RIGHT JOIN DOCGIA dg ON mt.MaSach = dg.MaDG;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Sử dụng LEFT JOIN từ bảng DOCGIA sang MUON_TRA để giữ toàn bộ danh sách độc giả, kết hợp COUNT(mt.MaPhieu) sẽ đếm là 0 đối với độc giả chưa có bản ghi mượn nào.',
      relatedSql: `SELECT dg.MaDG, dg.TenDG, COUNT(mt.MaPhieu) AS SoLanMuon\nFROM DOCGIA dg\nLEFT JOIN MUON_TRA mt ON dg.MaDG = mt.MaDG\nGROUP BY dg.MaDG, dg.TenDG\nORDER BY SoLanMuon DESC;`,
    },
    {
      id: 'TV-Q09',
      databaseId: 'QL_TV',
      level: 'Vận dụng',
      order: 9,
      question: 'Muốn tìm danh sách những tác giả có từ 2 đầu sách trở lên trong thư viện, truy vấn SQL nào sử dụng đúng mệnh đề HAVING?',
      options: [
        {
          key: 'A',
          text: `SELECT tg.MaTG, tg.TenTG, COUNT(s.MaSach) AS SoDauSach\nFROM TACGIA tg\nJOIN SACH s ON tg.MaTG = s.MaTG\nGROUP BY tg.MaTG, tg.TenTG\nHAVING COUNT(s.MaSach) >= 2;`,
        },
        {
          key: 'B',
          text: `SELECT tg.MaTG, tg.TenTG FROM TACGIA tg WHERE COUNT(tg.MaTG) >= 2;`,
        },
        {
          key: 'C',
          text: `SELECT tg.TenTG FROM TACGIA tg JOIN SACH s ON tg.MaTG = s.MaTG WHERE s.MaSach >= 2;`,
        },
        {
          key: 'D',
          text: `SELECT tg.TenTG, COUNT(s.MaSach) FROM TACGIA tg HAVING COUNT(s.MaSach) >= 2 GROUP BY tg.TenTG;`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Điều kiện lọc trên hàm gộp COUNT bắt buộc phải đặt trong mệnh đề HAVING sau mệnh đề GROUP BY chứ không thể đặt trong WHERE.',
      relatedSql: `SELECT tg.MaTG, tg.TenTG, COUNT(s.MaSach) AS SoDauSach\nFROM TACGIA tg\nJOIN SACH s ON tg.MaTG = s.MaTG\nGROUP BY tg.MaTG, tg.TenTG\nHAVING COUNT(s.MaSach) >= 2;`,
    },
    {
      id: 'TV-Q10',
      databaseId: 'QL_TV',
      level: 'Vận dụng',
      order: 10,
      question: 'Khi lập một phiếu mượn sách mới cho độc giả \'DG06\' mượn cuốn sách \'S07\', câu lệnh SQL INSERT nào tuân thủ đúng thứ tự cột và tính toàn vẹn dữ liệu?',
      options: [
        {
          key: 'A',
          text: `INSERT INTO MUON_TRA (MaPhieu, MaDG, MaSach, NgayMuon, NgayTra, TrangThai)\nVALUES ('PM09', 'DG06', 'S07', '2024-03-25', NULL, 'Đang mượn');`,
        },
        {
          key: 'B',
          text: `INSERT INTO MUON_TRA VALUES ('DG06', 'S07', '2024-03-25', 'Đang mượn');`,
        },
        {
          key: 'C',
          text: `UPDATE MUON_TRA SET MaDG = 'DG06', MaSach = 'S07' WHERE MaPhieu = 'PM09';`,
        },
        {
          key: 'D',
          text: `CREATE ROW IN MUON_TRA ('PM09', 'DG06', 'S07', '2024-03-25');`,
        },
      ],
      correctAnswer: 'A',
      explanation: 'Câu lệnh INSERT INTO chỉ định rõ danh sách các trường và cung cấp đầy đủ các giá trị tương ứng, với NgayTra là NULL vì sách mới mượn chưa trả.',
      relatedSql: `INSERT INTO MUON_TRA (MaPhieu, MaDG, MaSach, NgayMuon, NgayTra, TrangThai)\nVALUES ('PM09', 'DG06', 'S07', '2024-03-25', NULL, 'Đang mượn');`,
    },
  ],
};
