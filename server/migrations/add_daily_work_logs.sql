-- Daily Work Log Table for Piece Rate / Daily Production Tracking
CREATE TABLE IF NOT EXISTS daily_work_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    member_id INT NOT NULL,
    date DATE NOT NULL,
    units_produced DECIMAL(10, 2) DEFAULT 0.00,
    rate_per_unit DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) GENERATED ALWAYS AS (units_produced * rate_per_unit) STORED,
    work_type VARCHAR(100) DEFAULT 'production',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    UNIQUE KEY unique_member_date (member_id, date),
    INDEX idx_user_date (user_id, date),
    INDEX idx_member (member_id)
);
