(function () {
  function gid(id) { return document.getElementById(id); }
  function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function load(key) { return JSON.parse(localStorage.getItem(key) || 'null'); }

  function seed() {
    // ✅ المستخدمين
    if (!load('users')) {
      save('users', [
        { username: 'rashaadel23', password: 'rashaadel2333', role: 'admin' },
        { username: 'mariam', password: 'mariam123', role: 'staff' }
      ]);
    }

    // ✅ الخدمات الجديدة — فقط لو مش موجودة
    if (!load('services')) {
      save('services', [
        { id: 1, name: 'سشوار قصير وخفيف', price: 0 },
        { id: 2, name: 'سشوار متوسط', price: 0 },
        { id: 3, name: 'سشوار طويل', price: 0 },
        { id: 4, name: 'سشوار و بيبى ليس قصير', price: 0 },
        { id: 5, name: 'سشوار و بيبى ليس متوسط', price: 0 },
        { id: 6, name: 'سشوار و بيبى ليس كثيف', price: 0 },
        { id: 7, name: 'كيرلى قصير', price: 0 },
        { id: 8, name: 'كيرلى متوسط', price: 0 },
        { id: 9, name: 'كيرلى طويل', price: 0 },
        { id: 10, name: 'قصة شعر', price: 0 },
        { id: 11, name: 'قص أطراف', price: 0 },
        { id: 12, name: 'قص قَصَة', price: 0 },
        { id: 13, name: 'صبغة جدور خفيف', price: 0 },
        { id: 14, name: 'صبغة جدور متوسط', price: 0 },
        { id: 15, name: 'صبغة جذور ثقيل', price: 0 },
        { id: 16, name: 'صبغة كاملة غامق خفيف', price: 0 },
        { id: 17, name: 'صبغة كاملة غامق متوسط', price: 0 },
        { id: 18, name: 'صبغة كاملة غامق كثيف', price: 0 },
        { id: 19, name: 'صبغة + هايلايت خفيف', price: 0 },
        { id: 20, name: 'صبغة + هايلايت متوسط', price: 0 },
        { id: 21, name: 'بروتين تقيل 2', price: 0 },
        { id: 22, name: 'بروتين تقيل 3', price: 0 },
        { id: 23, name: 'بروتين تقيل 4', price: 0 },
        { id: 24, name: 'بروتين تقيل 6', price: 0 },
        { id: 25, name: 'وش و حواجب', price: 0 },
        { id: 26, name: 'واكس وش', price: 0 },
        { id: 27, name: 'شنب و حواجب', price: 0 },
        { id: 28, name: 'حواجب', price: 0 },
        { id: 29, name: 'شنب', price: 0 }
      ]);
    }

    // ✅ العملاء
    if (!load('clients')) save('clients', []);

    // ✅ الفواتير
    if (!load('invoices')) save('invoices', []);
  }

  // تسجيل الدخول
  function login(u, p) {
    const us = load('users') || [];
    return us.find(x => x.username === u && x.password === p) || null;
  }

  function logout() { localStorage.removeItem('currentUser'); }
  function currentUser() { return load('currentUser'); }

  // الخدمات
  function getServices() { return load('services') || []; }

  function addService(s) {
    const user = currentUser();
    if (!user || user.role !== 'admin') {
      alert('فقط المدير يمكنه إضافة خدمة جديدة');
      return;
    }
    const ss = load('services') || [];
    ss.push(s);
    save('services', ss);
    return ss;
  }

  function updateService(id, newPrice) {
    const user = currentUser();
    if (!user || user.role !== 'admin') {
      alert('فقط المدير يمكنه تعديل الأسعار');
      return;
    }
    const ss = getServices();
    const index = ss.findIndex(s => s.id === id);
    if (index !== -1) {
      ss[index].price = parseFloat(newPrice) || 0;
      save('services', ss);
      return true;
    }
    return false;
  }

  function deleteService(id) {
    const user = currentUser();
    if (!user || user.role !== 'admin') {
      alert('فقط المدير يمكنه حذف الخدمات');
      return;
    }
    const services = getServices();
    const updated = services.filter(s => s.id !== id);
    save('services', updated);
  }

  // العملاء
  function getClients() { return load('clients') || []; }

  function addClient(c) {
    const cl = load('clients') || [];
    const existing = cl.find(x => x.phone === c.phone);
    if (existing) return cl;
    const newClient = {
      name: c.name,
      phone: c.phone,
      address: c.address || "",
      healthNotes: c.healthNotes || "",
      created: new Date().toISOString()
    };
    cl.push(newClient);
    save('clients', cl);
    return cl;
  }

  // المستخدمين
  function getUsers() { return load('users') || []; }
  function addUser(u) {
    const us = load('users') || [];
    us.push(u);
    save('users', us);
    return us;
  }

  // الفواتير
  function getInvoices() { return load('invoices') || []; }

  function addInvoice(inv) {
    const iv = load('invoices') || [];
    iv.push({
      id: inv.id || Date.now(),
      client: inv.client,
      phone: inv.phone || '',
      specialist: inv.specialist || '',
      date: inv.date,
      services: inv.services || [],
      total_before: inv.total_before || 0,
      discount: inv.discount || 0,
      final: inv.final || 0
    });
    save('invoices', iv);
    return iv;
  }

  function deleteInvoice(id) {
    const all = getInvoices();
    const updated = all.filter(inv => inv.id !== id);
    save('invoices', updated);
    return updated;
  }

  function getTodayInvoices() {
    const all = getInvoices();
    const today = new Date().toISOString().split('T')[0];
    return all.filter(inv => inv.date === today);
  }

  function getMonthlyInvoices() {
    const all = getInvoices();
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    return all.filter(inv => {
      const d = new Date(inv.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
  }

  function calculateTotal(invoices) {
    return invoices.reduce((sum, inv) => sum + (parseFloat(inv.final) || 0), 0);
  }

  // واجهة التطبيق
  window.app = {
    init: function () { seed(); },
    login: function (u, p) {
      const user = login(u, p);
      if (user) localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    },
    logout,
    currentUser,
    getServices,
    addService,
    updateService,
    deleteService,
    getClients,
    addClient,
    getUsers,
    addUser,
    getInvoices,
    addInvoice,
    deleteInvoice,
    getTodayInvoices,
    getMonthlyInvoices,
    calculateTotal
  };

  document.addEventListener('DOMContentLoaded', seed);
})();
