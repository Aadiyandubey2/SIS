-- ─── Students ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  gender TEXT,
  dob TEXT,
  blood_group TEXT,
  class TEXT,
  section TEXT,
  roll_no INTEGER,
  admission_date TEXT,
  status TEXT DEFAULT 'Active',
  fee_status TEXT DEFAULT 'Pending',
  parent_name TEXT,
  address TEXT,
  attendance_rate NUMERIC DEFAULT 0
);

-- ─── Courses ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT,
  class TEXT,
  teacher TEXT,
  schedule TEXT,
  students_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Active'
);

-- ─── Attendance ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance_records (
  id TEXT PRIMARY KEY,
  student_id TEXT,
  student_name TEXT,
  class TEXT,
  section TEXT,
  date TEXT,
  status TEXT,
  check_in TEXT,
  check_out TEXT
);

-- ─── Exams ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS exams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT,
  class TEXT,
  date TEXT,
  duration TEXT,
  total_marks INTEGER,
  status TEXT DEFAULT 'Scheduled',
  avg_score NUMERIC,
  pass_rate NUMERIC
);

-- ─── Fee Records ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fee_records (
  id TEXT PRIMARY KEY,
  student_id TEXT,
  student_name TEXT,
  class TEXT,
  fee_type TEXT,
  amount NUMERIC,
  due_date TEXT,
  paid_date TEXT,
  status TEXT DEFAULT 'Pending',
  payment_method TEXT
);

-- ─── Activities ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  student TEXT,
  action TEXT,
  date TEXT,
  status TEXT
);

-- ─── Alerts ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alerts (
  id TEXT PRIMARY KEY,
  type TEXT,
  title TEXT,
  message TEXT,
  timestamp TEXT
);

-- ─── Dashboard Stats ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dashboard_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_students INTEGER,
  total_revenue NUMERIC,
  attendance_rate NUMERIC,
  pending_fees NUMERIC,
  active_classes INTEGER,
  total_teachers INTEGER,
  student_growth NUMERIC,
  revenue_growth NUMERIC,
  attendance_change NUMERIC,
  fee_collection_rate NUMERIC
);

-- ─── RLS Policies (allow public read) ────────────────────────────
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read students" ON students FOR SELECT USING (true);
CREATE POLICY "Allow public read courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Allow public read attendance" ON attendance_records FOR SELECT USING (true);
CREATE POLICY "Allow public read exams" ON exams FOR SELECT USING (true);
CREATE POLICY "Allow public read fees" ON fee_records FOR SELECT USING (true);
CREATE POLICY "Allow public read activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow public read alerts" ON alerts FOR SELECT USING (true);
CREATE POLICY "Allow public read stats" ON dashboard_stats FOR SELECT USING (true);

-- ─── SEED DATA ───────────────────────────────────────────────────

INSERT INTO students VALUES
('STU001','Aarav','Sharma','aarav.sharma@school.edu','+91 98765 43210','Male','2010-03-15','O+','10','A',1,'2020-04-01','Active','Paid','Rajesh Sharma','12 MG Road, Mumbai',96),
('STU002','Ananya','Patel','ananya.patel@school.edu','+91 98765 43211','Female','2010-07-22','A+','10','A',2,'2020-04-01','Active','Paid','Vikram Patel','45 Park Street, Ahmedabad',98),
('STU003','Arjun','Singh','arjun.singh@school.edu','+91 98765 43212','Male','2010-01-08','B+','10','B',3,'2020-04-01','Active','Pending','Harpreet Singh','78 Sector 22, Chandigarh',91),
('STU004','Diya','Gupta','diya.gupta@school.edu','+91 98765 43213','Female','2010-11-30','AB+','9','A',4,'2021-04-01','Active','Paid','Suresh Gupta','23 Civil Lines, Delhi',94),
('STU005','Kabir','Verma','kabir.verma@school.edu','+91 98765 43214','Male','2011-05-12','O-','9','A',5,'2021-04-01','Active','Overdue','Anil Verma','56 Anna Nagar, Chennai',78),
('STU006','Meera','Reddy','meera.reddy@school.edu','+91 98765 43215','Female','2010-09-03','A-','10','B',6,'2020-04-01','Active','Paid','Krishna Reddy','89 Jubilee Hills, Hyderabad',97),
('STU007','Rohan','Kumar','rohan.kumar@school.edu','+91 98765 43216','Male','2011-02-18','B-','9','B',7,'2021-04-01','Inactive','Pending','Sanjay Kumar','34 Boring Road, Patna',65),
('STU008','Saanvi','Iyer','saanvi.iyer@school.edu','+91 98765 43217','Female','2010-12-25','O+','10','A',8,'2020-04-01','Active','Paid','Ramesh Iyer','67 Koramangala, Bangalore',99),
('STU009','Vihaan','Joshi','vihaan.joshi@school.edu','+91 98765 43218','Male','2011-08-14','AB-','8','A',9,'2022-04-01','Active','Paid','Deepak Joshi','12 FC Road, Pune',93),
('STU010','Ishita','Nair','ishita.nair@school.edu','+91 98765 43219','Female','2011-04-07','A+','8','A',10,'2022-04-01','Active','Pending','Gopal Nair','45 Marine Drive, Kochi',88),
('STU011','Aditya','Mishra','aditya.mishra@school.edu','+91 98765 43220','Male','2010-06-20','B+','10','B',11,'2020-04-01','Active','Paid','Prakash Mishra','78 Hazratganj, Lucknow',95),
('STU012','Priya','Desai','priya.desai@school.edu','+91 98765 43221','Female','2011-10-11','O+','8','B',12,'2022-04-01','Active','Paid','Mahesh Desai','23 CG Road, Ahmedabad',92),
('STU013','Siddharth','Rao','siddharth.rao@school.edu','+91 98765 43222','Male','2010-04-28','A+','10','A',13,'2020-04-01','Suspended','Overdue','Venkat Rao','56 Banjara Hills, Hyderabad',52),
('STU014','Kavya','Menon','kavya.menon@school.edu','+91 98765 43223','Female','2011-01-15','B+','9','A',14,'2021-04-01','Active','Paid','Sunil Menon','89 MG Road, Trivandrum',96),
('STU015','Reyansh','Chatterjee','reyansh.c@school.edu','+91 98765 43224','Male','2011-07-30','AB+','8','A',15,'2022-04-01','Active','Paid','Debashish Chatterjee','34 Park Circus, Kolkata',90),
('STU016','Tara','Bhat','tara.bhat@school.edu','+91 98765 43225','Female','2010-08-09','O-','10','B',16,'2020-04-01','Active','Pending','Ganesh Bhat','67 Indiranagar, Bangalore',89),
('STU017','Arnav','Pillai','arnav.pillai@school.edu','+91 98765 43226','Male','2011-03-22','A-','9','B',17,'2021-04-01','Active','Paid','Rajan Pillai','12 Technopark, Trivandrum',94),
('STU018','Nisha','Saxena','nisha.saxena@school.edu','+91 98765 43227','Female','2011-12-05','B-','8','B',18,'2022-04-01','Active','Paid','Amit Saxena','45 Mall Road, Kanpur',97),
('STU019','Dev','Agarwal','dev.agarwal@school.edu','+91 98765 43228','Male','2010-10-17','O+','10','A',19,'2020-04-01','Active','Paid','Ravi Agarwal','78 Varanasi Road, Varanasi',92),
('STU020','Zara','Khan','zara.khan@school.edu','+91 98765 43229','Female','2011-06-13','A+','9','A',20,'2021-04-01','Active','Overdue','Imran Khan','23 Colaba, Mumbai',85),
('STU021','Vivaan','Malhotra','vivaan.m@school.edu','+91 98765 43230','Male','2010-02-28','AB+','10','B',21,'2020-04-01','Active','Paid','Rahul Malhotra','56 Connaught Place, Delhi',91),
('STU022','Aisha','Trivedi','aisha.t@school.edu','+91 98765 43231','Female','2011-09-19','B+','8','A',22,'2022-04-01','Active','Paid','Ketan Trivedi','89 Ashram Road, Ahmedabad',96),
('STU023','Krish','Pandey','krish.pandey@school.edu','+91 98765 43232','Male','2011-11-02','O+','8','B',23,'2022-04-01','Active','Pending','Vinod Pandey','34 Lanka, Varanasi',87),
('STU024','Riya','Shetty','riya.shetty@school.edu','+91 98765 43233','Female','2010-05-25','A-','10','A',24,'2020-04-01','Active','Paid','Mohan Shetty','67 Mangalore Road, Mangalore',98),
('STU025','Dhruv','Kapoor','dhruv.kapoor@school.edu','+91 98765 43234','Male','2011-08-08','B-','9','B',25,'2021-04-01','Active','Paid','Ajay Kapoor','12 Sector 17, Chandigarh',93);

INSERT INTO courses VALUES
('CRS001','Mathematics','MATH-10','10','Dr. Ramesh Iyer','Mon, Wed, Fri — 9:00 AM',42,'Active'),
('CRS002','Physics','PHY-10','10','Prof. Sunita Desai','Tue, Thu — 10:00 AM',42,'Active'),
('CRS003','Chemistry','CHEM-10','10','Dr. Anil Kumar','Mon, Wed — 11:00 AM',42,'Active'),
('CRS004','English Literature','ENG-10','10','Ms. Priya Menon','Tue, Thu, Sat — 9:00 AM',42,'Active'),
('CRS005','Biology','BIO-10','10','Dr. Kavita Rao','Mon, Fri — 2:00 PM',38,'Active'),
('CRS006','Hindi','HIN-10','10','Shri. Devendra Tiwari','Wed, Sat — 11:00 AM',42,'Active'),
('CRS007','Computer Science','CS-10','10','Mr. Vikram Joshi','Tue, Thu — 2:00 PM',35,'Active'),
('CRS008','Mathematics','MATH-9','9','Mrs. Anjali Sharma','Mon, Wed, Fri — 10:00 AM',40,'Active'),
('CRS009','Physics','PHY-9','9','Mr. Suresh Pillai','Tue, Thu — 11:00 AM',40,'Active'),
('CRS010','English','ENG-9','9','Ms. Reva Nair','Mon, Wed — 9:00 AM',40,'Active'),
('CRS011','Mathematics','MATH-8','8','Mr. Deepak Gupta','Mon, Wed, Fri — 11:00 AM',38,'Active'),
('CRS012','Science','SCI-8','8','Dr. Neha Verma','Tue, Thu — 9:00 AM',38,'Active'),
('CRS013','Social Studies','SS-10','10','Mr. Ashok Bhat','Fri, Sat — 10:00 AM',42,'Active'),
('CRS014','Art & Design','ART-9','9','Ms. Tara Malik','Sat — 2:00 PM',25,'Active'),
('CRS015','Physical Education','PE-ALL','All','Mr. Rajan Singh','Daily — 3:30 PM',120,'Active');

INSERT INTO attendance_records VALUES
('ATT001','STU001','Aarav Sharma','10','A','2026-04-24','Present','8:45 AM','3:30 PM'),
('ATT002','STU002','Ananya Patel','10','A','2026-04-24','Present','8:30 AM','3:30 PM'),
('ATT003','STU003','Arjun Singh','10','B','2026-04-24','Late','9:15 AM','3:30 PM'),
('ATT004','STU004','Diya Gupta','9','A','2026-04-24','Present','8:40 AM','3:30 PM'),
('ATT005','STU005','Kabir Verma','9','A','2026-04-24','Absent',NULL,NULL),
('ATT006','STU006','Meera Reddy','10','B','2026-04-24','Present','8:35 AM','3:30 PM'),
('ATT007','STU007','Rohan Kumar','9','B','2026-04-24','Absent',NULL,NULL),
('ATT008','STU008','Saanvi Iyer','10','A','2026-04-24','Present','8:20 AM','3:30 PM'),
('ATT009','STU009','Vihaan Joshi','8','A','2026-04-24','Present','8:50 AM','3:30 PM'),
('ATT010','STU010','Ishita Nair','8','A','2026-04-24','Late','9:05 AM','3:30 PM'),
('ATT011','STU011','Aditya Mishra','10','B','2026-04-24','Present','8:42 AM','3:30 PM'),
('ATT012','STU012','Priya Desai','8','B','2026-04-24','Present','8:38 AM','3:30 PM'),
('ATT013','STU013','Siddharth Rao','10','A','2026-04-24','Absent',NULL,NULL),
('ATT014','STU014','Kavya Menon','9','A','2026-04-24','Present','8:25 AM','3:30 PM'),
('ATT015','STU015','Reyansh Chatterjee','8','A','2026-04-24','Present','8:48 AM','3:30 PM'),
('ATT016','STU016','Tara Bhat','10','B','2026-04-24','Excused',NULL,NULL),
('ATT017','STU017','Arnav Pillai','9','B','2026-04-24','Present','8:33 AM','3:30 PM'),
('ATT018','STU018','Nisha Saxena','8','B','2026-04-24','Present','8:29 AM','3:30 PM'),
('ATT019','STU019','Dev Agarwal','10','A','2026-04-24','Present','8:44 AM','3:30 PM'),
('ATT020','STU020','Zara Khan','9','A','2026-04-24','Late','9:20 AM','3:30 PM');

INSERT INTO exams VALUES
('EXM001','Mid-Term Examination','Mathematics','10','2026-05-10','3 hours',100,'Scheduled',NULL,NULL),
('EXM002','Mid-Term Examination','Physics','10','2026-05-12','3 hours',100,'Scheduled',NULL,NULL),
('EXM003','Mid-Term Examination','Chemistry','10','2026-05-14','3 hours',100,'Scheduled',NULL,NULL),
('EXM004','Mid-Term Examination','English','10','2026-05-16','3 hours',100,'Scheduled',NULL,NULL),
('EXM005','Unit Test 1','Mathematics','10','2026-04-15','1 hour',50,'Completed',38.5,92),
('EXM006','Unit Test 1','Physics','10','2026-04-16','1 hour',50,'Completed',35.2,88),
('EXM007','Unit Test 1','English','10','2026-04-17','1 hour',50,'Completed',41.0,95),
('EXM008','Mid-Term Examination','Mathematics','9','2026-05-11','3 hours',100,'Scheduled',NULL,NULL),
('EXM009','Mid-Term Examination','Science','9','2026-05-13','3 hours',100,'Scheduled',NULL,NULL),
('EXM010','Unit Test 1','Mathematics','9','2026-04-14','1 hour',50,'Completed',36.8,90),
('EXM011','Mid-Term Examination','Mathematics','8','2026-05-10','2.5 hours',80,'Scheduled',NULL,NULL),
('EXM012','Unit Test 1','Science','8','2026-04-18','1 hour',50,'Completed',39.3,93),
('EXM013','Practical Exam','Physics Lab','10','2026-05-20','2 hours',30,'Scheduled',NULL,NULL),
('EXM014','Practical Exam','Chemistry Lab','10','2026-05-22','2 hours',30,'Scheduled',NULL,NULL);

INSERT INTO fee_records VALUES
('FEE001','STU001','Aarav Sharma','10','Tuition Fee',25000,'2026-04-01','2026-03-28','Paid','Online'),
('FEE002','STU002','Ananya Patel','10','Tuition Fee',25000,'2026-04-01','2026-03-30','Paid','Cheque'),
('FEE003','STU003','Arjun Singh','10','Tuition Fee',25000,'2026-04-01',NULL,'Pending',NULL),
('FEE004','STU004','Diya Gupta','9','Tuition Fee',22000,'2026-04-01','2026-04-01','Paid','Online'),
('FEE005','STU005','Kabir Verma','9','Tuition Fee',22000,'2026-03-01',NULL,'Overdue',NULL),
('FEE006','STU006','Meera Reddy','10','Tuition Fee',25000,'2026-04-01','2026-03-25','Paid','Online'),
('FEE007','STU007','Rohan Kumar','9','Tuition Fee',22000,'2026-04-01',NULL,'Pending',NULL),
('FEE008','STU008','Saanvi Iyer','10','Tuition Fee',25000,'2026-04-01','2026-03-20','Paid','Cash'),
('FEE009','STU001','Aarav Sharma','10','Lab Fee',5000,'2026-04-15','2026-04-10','Paid','Online'),
('FEE010','STU002','Ananya Patel','10','Lab Fee',5000,'2026-04-15',NULL,'Pending',NULL),
('FEE011','STU013','Siddharth Rao','10','Tuition Fee',25000,'2026-02-01',NULL,'Overdue',NULL),
('FEE012','STU016','Tara Bhat','10','Tuition Fee',25000,'2026-04-01',NULL,'Pending',NULL),
('FEE013','STU020','Zara Khan','9','Tuition Fee',22000,'2026-02-01',NULL,'Overdue',NULL),
('FEE014','STU010','Ishita Nair','8','Tuition Fee',20000,'2026-04-01',NULL,'Pending',NULL),
('FEE015','STU023','Krish Pandey','8','Tuition Fee',20000,'2026-04-01',NULL,'Pending',NULL),
('FEE016','STU009','Vihaan Joshi','8','Tuition Fee',20000,'2026-04-01','2026-03-29','Paid','Online'),
('FEE017','STU005','Kabir Verma','9','Transport Fee',8000,'2026-03-01',NULL,'Overdue',NULL),
('FEE018','STU013','Siddharth Rao','10','Lab Fee',5000,'2026-03-15',NULL,'Overdue',NULL);

INSERT INTO activities VALUES
('ACT001','Aarav Sharma','Fee payment received — ₹25,000','2026-04-24','Completed'),
('ACT002','Kabir Verma','Attendance warning — 3 consecutive absences','2026-04-24','Pending'),
('ACT003','Ananya Patel','Exam result uploaded — Unit Test 1','2026-04-23','Completed'),
('ACT004','Siddharth Rao','Suspension notice issued','2026-04-23','Completed'),
('ACT005','Zara Khan','Fee overdue reminder sent','2026-04-22','Pending'),
('ACT006','Meera Reddy','Merit certificate generated','2026-04-22','Completed'),
('ACT007','Dev Agarwal','Parent meeting scheduled','2026-04-21','Pending'),
('ACT008','Saanvi Iyer','Transfer certificate requested','2026-04-21','Completed');

INSERT INTO alerts VALUES
('ALT001','error','Fee Overdue','5 students have fees overdue by more than 30 days','2 hours ago'),
('ALT002','warning','Low Attendance','Kabir Verma (9-A) attendance dropped below 80%','3 hours ago'),
('ALT003','info','Exam Schedule','Mid-Term examinations start on May 10, 2026','5 hours ago'),
('ALT004','warning','Pending Fees','7 students have pending fee payments for April','1 day ago'),
('ALT005','error','Suspension','Siddharth Rao (10-A) suspended — disciplinary action','1 day ago'),
('ALT006','info','Report Cards','Unit Test 1 report cards ready for distribution','2 days ago');

INSERT INTO dashboard_stats VALUES
(1, 2847, 1245000, 94.2, 321500, 24, 68, 12.5, 8.3, -1.2, 87.4);
