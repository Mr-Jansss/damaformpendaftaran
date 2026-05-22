# 🚀 Quick Reference - CSS Murni

## 📋 Cheat Sheet

### 🎨 Colors
```css
var(--primary)      /* #FF6B00 - Orange */
var(--primary-dark) /* #FF8C00 - Dark Orange */
var(--gray-50)      /* #F9FAFB - Very Light Gray */
var(--gray-500)     /* #6B7280 - Medium Gray */
var(--gray-800)     /* #1F2937 - Dark Gray */
var(--green)        /* #10B981 - Success */
var(--yellow)       /* #F59E0B - Warning */
var(--red)          /* #EF4444 - Danger */
var(--blue)         /* #3B82F6 - Info */
```

### 🔘 Buttons
```html
<!-- Primary Button -->
<button class="btn btn-primary">Click Me</button>

<!-- Success Button -->
<button class="btn btn-success">Save</button>

<!-- Danger Button -->
<button class="btn btn-danger">Delete</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Cancel</button>

<!-- Small Button -->
<button class="btn btn-primary btn-sm">Small</button>

<!-- Full Width Button -->
<button class="btn btn-primary w-full">Full Width</button>

<!-- With Icon -->
<button class="btn btn-primary icon-save">Save</button>
```

### 📝 Forms
```html
<!-- Text Input -->
<div class="form-group">
    <label class="form-label">Name</label>
    <input type="text" class="form-input" placeholder="Enter name">
</div>

<!-- Select -->
<div class="form-group">
    <label class="form-label">Choose</label>
    <select class="form-select">
        <option>Option 1</option>
        <option>Option 2</option>
    </select>
</div>

<!-- Textarea -->
<div class="form-group">
    <label class="form-label">Description</label>
    <textarea class="form-textarea" rows="4"></textarea>
</div>

<!-- With Icon Label -->
<label class="form-label icon-user">Username</label>
```

### 🃏 Cards
```html
<!-- Basic Card -->
<div class="card">
    <h3>Card Title</h3>
    <p>Card content goes here...</p>
</div>

<!-- Stat Card -->
<div class="stat-card">
    <div>
        <p class="stat-label">Total Users</p>
        <h3 class="stat-value">150</h3>
    </div>
    <div class="stat-icon" style="background: #DBEAFE; color: #3B82F6;">
        👥
    </div>
</div>
```

### 📊 Tables
```html
<table class="table">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td><span class="badge badge-approved">Active</span></td>
        </tr>
    </tbody>
</table>
```

### 🏷️ Badges
```html
<span class="badge badge-pending">Pending</span>
<span class="badge badge-approved">Approved</span>
<span class="badge badge-rejected">Rejected</span>
<span class="badge badge-blue">Info</span>
```

### 📐 Layout
```html
<!-- Container -->
<div class="container">
    <!-- Content with max-width and centered -->
</div>

<!-- Grid 2 Columns -->
<div class="grid grid-cols-2">
    <div>Column 1</div>
    <div>Column 2</div>
</div>

<!-- Grid 3 Columns -->
<div class="grid grid-cols-3">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>

<!-- Grid 4 Columns -->
<div class="grid grid-cols-4">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
    <div>Column 4</div>
</div>

<!-- Flex -->
<div class="flex items-center justify-between">
    <div>Left</div>
    <div>Right</div>
</div>
```

### 🪟 Modal
```html
<!-- Modal HTML -->
<div id="myModal" class="modal">
    <div class="modal-content">
        <h3>Modal Title</h3>
        <p>Modal content...</p>
        <button onclick="closeModal()">Close</button>
    </div>
</div>

<!-- JavaScript -->
<script>
function showModal() {
    document.getElementById('myModal').classList.add('active');
}

function closeModal() {
    document.getElementById('myModal').classList.remove('active');
}
</script>
```

### 🎯 Icons (Emoji)
```html
<span class="icon-trophy">Trophy</span>      <!-- 🏆 -->
<span class="icon-calendar">Calendar</span>  <!-- 📅 -->
<span class="icon-location">Location</span>  <!-- 📍 -->
<span class="icon-megaphone">News</span>     <!-- 📢 -->
<span class="icon-send">Send</span>          <!-- 📤 -->
<span class="icon-user">User</span>          <!-- 👤 -->
<span class="icon-lock">Lock</span>          <!-- 🔒 -->
<span class="icon-login">Login</span>        <!-- 🔐 -->
<span class="icon-home">Home</span>          <!-- 🏠 -->
<span class="icon-logout">Logout</span>      <!-- 🚪 -->
<span class="icon-users">Users</span>        <!-- 👥 -->
<span class="icon-user-tie">Admin</span>     <!-- 👔 -->
<span class="icon-check">Check</span>        <!-- ✅ -->
<span class="icon-times">Close</span>        <!-- ❌ -->
<span class="icon-eye">View</span>           <!-- 👁️ -->
<span class="icon-edit">Edit</span>          <!-- ✏️ -->
<span class="icon-trash">Delete</span>       <!-- 🗑️ -->
<span class="icon-plus">Add</span>           <!-- ➕ -->
<span class="icon-save">Save</span>          <!-- 💾 -->
<span class="icon-chart">Chart</span>        <!-- 📊 -->
<span class="icon-excel">Excel</span>        <!-- 📊 -->
<span class="icon-close">Close</span>        <!-- ✖️ -->
<span class="icon-info">Info</span>          <!-- ℹ️ -->
<span class="icon-alert">Alert</span>        <!-- ⚠️ -->
<span class="icon-back">Back</span>          <!-- ⬅️ -->
<span class="icon-loading">Loading</span>    <!-- ⏳ -->
```

### 📏 Spacing
```html
<!-- Margin Top -->
<div class="mt-1">Margin top 0.5rem</div>
<div class="mt-2">Margin top 1rem</div>
<div class="mt-3">Margin top 1.5rem</div>
<div class="mt-4">Margin top 2rem</div>

<!-- Margin Bottom -->
<div class="mb-1">Margin bottom 0.5rem</div>
<div class="mb-2">Margin bottom 1rem</div>
<div class="mb-3">Margin bottom 1.5rem</div>
<div class="mb-4">Margin bottom 2rem</div>

<!-- Padding -->
<div class="p-1">Padding 0.5rem</div>
<div class="p-2">Padding 1rem</div>
<div class="p-3">Padding 1.5rem</div>
<div class="p-4">Padding 2rem</div>
```

### 📱 Responsive
```html
<!-- Grid auto-responsive -->
<div class="grid grid-cols-3">
    <!-- Automatically becomes 1 column on mobile -->
</div>

<!-- Hide on mobile (custom CSS) -->
<style>
@media (max-width: 768px) {
    .hide-mobile { display: none; }
}
</style>
<div class="hide-mobile">Desktop only</div>
```

### 🎨 Custom Styling
```html
<!-- Inline CSS Variables -->
<div style="color: var(--primary);">Orange text</div>
<div style="background: var(--gray-50);">Light gray background</div>

<!-- Custom Class -->
<style>
.my-custom-class {
    background: var(--primary);
    color: var(--white);
    padding: 1rem;
    border-radius: 0.5rem;
}
</style>
<div class="my-custom-class">Custom styled</div>
```

### ⚡ Common Patterns

#### Login Form
```html
<form class="card" style="max-width: 400px; margin: 0 auto;">
    <div class="form-group">
        <label class="form-label icon-user">Username</label>
        <input type="text" class="form-input" autocomplete="username">
    </div>
    <div class="form-group">
        <label class="form-label icon-lock">Password</label>
        <input type="password" class="form-input" autocomplete="current-password">
    </div>
    <button type="submit" class="btn btn-primary w-full icon-login">
        Login
    </button>
</form>
```

#### Stats Dashboard
```html
<div class="grid grid-cols-4">
    <div class="stat-card">
        <div>
            <p class="stat-label">Total</p>
            <h3 class="stat-value">150</h3>
        </div>
        <div class="stat-icon" style="background: #DBEAFE; color: #3B82F6;">
            👥
        </div>
    </div>
    <!-- Repeat for other stats -->
</div>
```

#### Data Table with Actions
```html
<div class="card">
    <div class="table-header">
        <h3>Users</h3>
        <button class="btn btn-primary icon-plus">Add User</button>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John Doe</td>
                <td>john@example.com</td>
                <td>
                    <button class="btn btn-sm btn-primary icon-eye">View</button>
                    <button class="btn btn-sm btn-danger icon-trash">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

#### Loading State
```html
<div class="text-center" style="padding: 2rem;">
    <div class="spinner"></div>
    <p style="margin-top: 0.5rem; color: var(--gray-500);">Loading...</p>
</div>
```

#### Error Message
```html
<div style="background: #FEE2E2; border: 1px solid #FCA5A5; color: #991B1B; padding: 0.75rem 1rem; border-radius: 0.5rem;">
    <span class="icon-alert">Error: Something went wrong!</span>
</div>
```

#### Success Message
```html
<div style="background: #D1FAE5; border: 1px solid #6EE7B7; color: #065F46; padding: 0.75rem 1rem; border-radius: 0.5rem;">
    <span class="icon-check">Success: Data saved!</span>
</div>
```

---

## 🔧 JavaScript Helpers

### Show/Hide Modal
```javascript
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}
```

### Toggle Password Visibility
```javascript
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    this.textContent = type === 'password' ? '👁️' : '🙈';
});
```

### Show Notification
```javascript
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Usage
showNotification('Data saved successfully!', 'success');
showNotification('Error occurred!', 'error');
```

### Filter Table
```javascript
const searchInput = document.getElementById('searchInput');
const table = document.getElementById('dataTable');

searchInput.addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const text = rows[i].textContent.toLowerCase();
        rows[i].style.display = text.includes(filter) ? '' : 'none';
    }
});
```

---

## 📚 Resources

- **Main CSS:** `frontend/css/styles.css`
- **Documentation:** `PERUBAHAN_CSS_MURNI.md`
- **Summary:** `SUMMARY_UPDATE.md`
- **Examples:** Check HTML files in `frontend/` folder

---

**Happy Coding! 🚀**
