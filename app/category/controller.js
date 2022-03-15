const Category = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');

            const alert = { message: alertMessage, status: alertStatus }
            const category = await Category.find()

            res.render('admin/category/view_category', {
                category,
                alert,
                name: req.session.user.name,
                title: 'Halaman Kategori'
            });
            // res.render('index', {
            //     title: 'Express js'
            // })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render('admin/category/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah kategori'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
            // console.log(err);
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { name } = req.body

            let category = await Category({ name })
            await category.save();

            req.flash('alertMessage', "Kategori Berhasil ditambah");
            req.flash('alertStatus', "Success");

            res.redirect('/category');  
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
            // console.log(err)
            
        }
    },

    viewEdit: async(req, res)=> {
        try {
            const { id } = req.params
            
            const category = await Category.findOne({ _id: id });

            res.render('admin/category/edit', {
                category,
                name: req.session.user.name,
                title: 'Halaman Ubah Kategori'
            });
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
            // console.log(err);
        }
    },

    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            await Category.findOneAndUpdate({
                _id: id
            }, { name });

            res.redirect('/category');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
            // console.log(err)
        }
    },
    
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;

            await Category.findOneAndRemove({
                _id: id
            });

            req.flash('alertMessage', "Berhasil menghapus Kategori");
            req.flash('alertStatus', "Success");

            res.redirect('/category');
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    }
}