/* ---------- Supabase Tanımlamaları ---------- */
const supabaseUrl = 'https://bcbzolhioialeexuglba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYnpvbGhpb2lhbGVleHVnbGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDAxOTgsImV4cCI6MjA5Nzg3NjE5OH0.fLzYAzz25s5byVMPHWEeqFmPDeUYKf8yD1dY1bQjPMI';

// Supabase client instance
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Global Durum (State)
window.state = {
  blog: [],
  fcats: [],
  topics: [],
  adminPass: 'dias2025',
  isAdmin: false,
  adminTab: 'dash',
  editing: null,
  blogFilter: 'Tümü'
};

// Veri Yükleme (Supabase'den okuma)
window.loadData = async function() {
  try {
    // 1. Blog yazılarını çek
    const { data: posts, error: postsErr } = await supabaseClient
      .from('posts')
      .select('*')
      .order('date', { ascending: false });
    
    if (postsErr) throw postsErr;
    window.state.blog = posts || [];

    // 2. Forum kategorilerini çek
    const { data: cats, error: catsErr } = await supabaseClient
      .from('categories')
      .select('*')
      .order('id', { ascending: true });
    
    if (catsErr) throw catsErr;
    window.state.fcats = cats || [];

    // 3. Forum konularını ve bu konulara ait yanıtları çek
    const { data: topics, error: topicsErr } = await supabaseClient
      .from('topics')
      .select('*, replies(*)');
    
    if (topicsErr) throw topicsErr;
    
    if (topics) {
      // Yanıtları kendi içinde tarihe göre sırala
      topics.forEach(t => {
        if (t.replies) {
          t.replies.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
          t.replies = [];
        }
      });
      window.state.topics = topics;
    } else {
      window.state.topics = [];
    }

    // 4. Ayarlardan şifreyi çek
    const { data: settings, error: settingsErr } = await supabaseClient
      .from('settings')
      .select('*')
      .eq('key', 'admin_pass')
      .single();
    
    // Eğer hata yoksa ve değer döndüyse güncelle, aksi halde varsayılan dias2025 kalsın
    if (!settingsErr && settings) {
      window.state.adminPass = settings.value;
    } else {
      window.state.adminPass = 'dias2025';
    }

  } catch (err) {
    console.error("Supabase veri çekme hatası:", err);
    // Hata durumunda local veri (SEED) ile başlat
    window.state.blog = window.SEED_BLOG;
    window.state.fcats = window.SEED_FCATS;
    window.state.topics = window.SEED_TOPICS;
    window.state.adminPass = 'dias2025';
  }
};

// Veri Kaydetme ve Düzenleme Arayüzleri (Supabase yazma/güncelleme)
window.dbSaveBlog = async function() {
  try {
    // Önce silinenleri veritabanından kaldıralım
    const { data: dbPosts } = await supabaseClient.from('posts').select('id');
    if (dbPosts) {
      const currentIds = window.state.blog.map(p => p.id);
      const toDelete = dbPosts.filter(p => !currentIds.includes(p.id)).map(p => p.id);
      if (toDelete.length > 0) {
        await supabaseClient.from('posts').delete().in('id', toDelete);
      }
    }
    // Sonra güncel listeyi kaydet/güncelle
    if (window.state.blog.length > 0) {
      const { error } = await supabaseClient.from('posts').upsert(window.state.blog);
      if (error) throw error;
    }
  } catch (err) {
    console.error("Blog kaydetme hatası:", err);
  }
};

window.dbSaveTopics = async function() {
  try {
    // 1. Silinen Konuları Veritabanından Kaldır
    const { data: dbTopics } = await supabaseClient.from('topics').select('id');
    if (dbTopics) {
      const currentTopicIds = window.state.topics.map(t => t.id);
      const topicsToDelete = dbTopics.filter(t => !currentTopicIds.includes(t.id)).map(t => t.id);
      if (topicsToDelete.length > 0) {
        await supabaseClient.from('topics').delete().in('id', topicsToDelete);
      }
    }

    // 2. Silinen Yanıtları Veritabanından Kaldır
    const { data: dbReplies } = await supabaseClient.from('replies').select('id');
    if (dbReplies) {
      const currentReplyIds = [];
      window.state.topics.forEach(t => {
        if (t.replies) t.replies.forEach(r => currentReplyIds.push(r.id));
      });
      const repliesToDelete = dbReplies.filter(r => !currentReplyIds.includes(r.id)).map(r => r.id);
      if (repliesToDelete.length > 0) {
        await supabaseClient.from('replies').delete().in('id', repliesToDelete);
      }
    }

    // 3. Konuları Kaydet/Güncelle
    const dbTopicsToUpsert = window.state.topics.map(t => {
      const { replies, ...topicData } = t;
      return topicData;
    });
    if (dbTopicsToUpsert.length > 0) {
      const { error: tErr } = await supabaseClient.from('topics').upsert(dbTopicsToUpsert);
      if (tErr) throw tErr;
    }

    // 4. Yanıtları Kaydet/Güncelle
    const dbRepliesToUpsert = [];
    window.state.topics.forEach(t => {
      if (t.replies) {
        t.replies.forEach(r => {
          dbRepliesToUpsert.push({
            id: r.id,
            topic_id: t.id,
            author: r.author,
            body: r.body,
            date: r.date,
            op: r.op || false
          });
        });
      }
    });
    if (dbRepliesToUpsert.length > 0) {
      const { error: rErr } = await supabaseClient.from('replies').upsert(dbRepliesToUpsert);
      if (rErr) throw rErr;
    }
  } catch (err) {
    console.error("Forum konularını kaydetme hatası:", err);
  }
};

window.dbSaveFCats = async function() {
  try {
    // Önce silinen kategorileri kaldıralım
    const { data: dbCats } = await supabaseClient.from('categories').select('id');
    if (dbCats) {
      const currentCatIds = window.state.fcats.map(c => c.id);
      const catsToDelete = dbCats.filter(c => !currentCatIds.includes(c.id)).map(c => c.id);
      if (catsToDelete.length > 0) {
        await supabaseClient.from('categories').delete().in('id', catsToDelete);
      }
    }
    // Güncel listeyi kaydet/güncelle
    if (window.state.fcats.length > 0) {
      const { error } = await supabaseClient.from('categories').upsert(window.state.fcats);
      if (error) throw error;
    }
  } catch (err) {
    console.error("Kategorileri kaydetme hatası:", err);
  }
};

window.dbSavePass = async function(newPass) {
  try {
    window.state.adminPass = newPass;
    const { error } = await supabaseClient.from('settings').upsert({ key: 'admin_pass', value: newPass });
    if (error) throw error;
  } catch (err) {
    console.error("Şifre kaydetme hatası:", err);
  }
};

window.dbResetAllData = async function() {
  try {
    // Tüm tabloların satırlarını sil
    await supabaseClient.from('replies').delete().neq('id', 'dummy_id');
    await supabaseClient.from('topics').delete().neq('id', 'dummy_id');
    await supabaseClient.from('categories').delete().neq('id', 'dummy_id');
    await supabaseClient.from('posts').delete().neq('id', 'dummy_id');
    await supabaseClient.from('settings').delete().neq('key', 'dummy_key');

    // Local state seed verilerine dönsün
    window.state.blog = JSON.parse(JSON.stringify(window.SEED_BLOG));
    window.state.fcats = JSON.parse(JSON.stringify(window.SEED_FCATS));
    window.state.topics = JSON.parse(JSON.stringify(window.SEED_TOPICS));
    window.state.adminPass = 'dias2025';

    // Veritabanına başlangıç verilerini ekleyelim
    await supabaseClient.from('posts').insert(window.state.blog);
    await supabaseClient.from('categories').insert(window.state.fcats);
    
    const dbTopics = window.state.topics.map(t => {
      const { replies, ...topicData } = t;
      return topicData;
    });
    await supabaseClient.from('topics').insert(dbTopics);

    const dbReplies = [];
    window.state.topics.forEach(t => {
      if (t.replies) {
        t.replies.forEach(r => {
          dbReplies.push({
            id: r.id,
            topic_id: t.id,
            author: r.author,
            body: r.body,
            date: r.date,
            op: r.op || false
          });
        });
      }
    });
    if (dbReplies.length > 0) {
      await supabaseClient.from('replies').insert(dbReplies);
    }

    await supabaseClient.from('settings').insert({ key: 'admin_pass', value: 'dias2025' });
  } catch (err) {
    console.error("Verileri sıfırlama hatası:", err);
  }
};
