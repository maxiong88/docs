---
title: h5�洢
description: 'h5�洢'
sidebar: 'auto'
time: '2015-01-06'
prev: ''
next: ''
---

1.html5�е�web storage��˾����֮��������洢�����ַ�ʽ��sessionStorage��localStorage
 sessionStorage���ڱ��ش洢һ���Ựsession�е����ݣ���Щ����ֻ����ͬһ���Ự�е�ҳ����ܷ��ʵ��Ự������ҳ��ر�ʱ������Ҳ��֮��ʧ
 sessionstorage����һ�ֳ־û��ı��ش洢�������ǻỰ����Ĵ洢
 ��localStorage���ڳ־û����ش洢����������ɾ�����ݣ�������������Զ������ڵ�
web storage��cookie������
Web Storage�ĸ����cookie���ƣ�����������Ϊ�˸��������洢��Ƶġ�Cookie�Ĵ�С�����޵ģ�����ÿ��������һ���µ�ҳ���ʱ��Cookie���ᱻ���͹�ȥ�������������˷��˴�������cookie����Ҫָ�������򣬲����Կ�����á�
����֮�⣬Web Storageӵ��setItem,getItem,removeItem,clear�ȷ���������cookie��Ҫǰ�˿������Լ���װsetCookie��getCookie��
����CookieҲ�ǲ����Ի�ȱ�ģ�Cookie������������������н�������ΪHTTP�淶��һ���ֶ����� ����Web Storage������Ϊ���ڱ��ء��洢�����ݶ���
if(window.addEventlistener){
window.addEventlistener("storage",storage_fun,false);

}else if(window.attachEvent){
window.attachEvent("storage",storage_fun);

}

IE7һ����userData

2.html5  touch�¼�
  touchstart�¼�������ָ������Ļʱ�򴥷�����ʹ�Ѿ���һ����ָ������Ļ��Ҳ�ᴥ��
  touchmove�¼�������ָ����Ļ������ʱ�������Ĵ�����������¼������ڼ䣬����preventDefault()�¼�������ֹ����
  touchend�¼�������ָ����Ļ���뿪��ʱ�򴥷�
  touchcancel�¼�����ϵͳֹͣ���ٴ�����ʱ�򴥷�
  clientX���ص�ǰ�¼�������ʱ�����ָ���ˮƽλ��
  clientY�����¼�����ʱ�����ָ��Ĵ�ֱ����
  screenX��ĳ���¼�������ʱ�������ֿ��ˮƽ����
  screenY(���ص�ĳ���¼�������ʱ�����ָ��Ĵ�ֱ����)
  touches:��ʾ��ǰ���ٵĴ���������touch���������
  targetTouches���ض����¼�Ŀ���touch��������
  changeTouches����ʾ���ϴδ�������������ʲô�ı��Touch��������顣
  ÿ��Touch����������������¡�
  clientX������Ŀ�����ӿ��е�x���ꡣ
  clientY������Ŀ�����ӿ��е�y���ꡣ
  identifier����ʶ������ΨһID��
   pageX������Ŀ����ҳ���е�x���ꡣ
   pageY������Ŀ����ҳ���е�y���ꡣ
   screenX������Ŀ������Ļ�е�x���ꡣ
   screenY������Ŀ������Ļ�е�y���ꡣ
   target����Ŀ��DOM�ڵ�Ŀ�ꡣ

touch  �¼�  ��Ҫ��ֹ�¼���Ĭ����Ϊ   event.preventDefault();


html5���Թ���
1.webkit�ں�ʹ��---�ȸ��toggle device mode ������ ����˿ è�ģ�
                ---ƻ�����
2.���os ģ����--firebug
3.IE�����----ʹ��IEtester  IE̩˿��
4.ʹ��browserstack����    ������ ˿̩��
5.ŷ�������


css����ѡ��
   font-family:'Hiragino Sans GB','Microsoft Yahei',"WenQuanYi Micro Hei",SimSun,Tahoma,Arial,Helvetica,STHeiti;

��Щ��ҳ���������� ��ƻ���������塱(�����ƻ��ϵ���豸����)��΢���źڡ���Ȫ��(ϸ)΢�׺����壬���壬Tahoma,Arial,Helvetica,ƻ����������(�����ƻ��ϵ���豸����)

���ѡ����ҳ���壿
����ʹ��΢���źڣ���������ֻ�����ĸ�Ļ����Գ���ʹ��Ӣ������Tahoma,Arial,Helvetica�����һ��ƻ��ϵ���豸������һ��'Hiragino Sans GB',STHeiti

΢���ź������С�ֺŻ᲻�ÿ������ֺŻ�ȽϺÿ����ź�����Ӵֲ��ÿ������ֺŲ���
�ֱȽ����ۡ�

font-size:�����С �ƶ���ʹ��rem


�����Ч������ҳ����ʱ�䣿
 1.����ҳ��http��������
    a.ʹ��CSS Sprites��������ͼƬ�ϲ�
    b.
  2.cdn�������
  3.����ļ�����ͷ
  4.����������gzipѹ��
  5.js�ű��ŵ�ĩβ
  6.����ʹ��css�ű�
  7.css,js�ⲿ���ã��ϲ�ѹ���ļ�
  8.�����ܼ���dcomԪ��
  9.��ҳ��ʽ

360�������Ⱦģʽ�̶�����ģʽ <meta name="renderer" content="webkit">


Modernizr(ë������)��һ������������HTML5��CSS3����Ĭ�ϴ����¼� */

����

  -ms-touch-action: none;  /* ��ֹwindows Phone ��Ĭ�ϴ����¼� */



box-shadw��Ӱ �ϣ����� �ң������£������󣨸��� ��Ϊ0 0 ��ʱ�����ܶ�����Ӱ  ��������������ģ������ ���ĸ�����ģ������
